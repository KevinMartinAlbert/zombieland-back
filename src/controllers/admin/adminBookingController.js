import { Booking, User } from '../../models/index.js';

const adminBookingController = {
  bookingsPage: async (req, res) => {
    try {
      // Fetch all bookings with client information
      const bookings = await Booking.findAll({
        include: [{ association: 'client' }],
        order: [['booking_id', 'ASC']],
      });
      // Fetch all users with role 'user'
      const users = await User.findAll({
        where: { role: 'user' },
        attributes: ['user_id', 'first_name', 'last_name', 'email'],
      });

      // Render the bookings page with fetched data
      res.render('admin-booking', {
        bookings,
        users,
        currentPage: 'bookings',
      });
    } catch (error) {
      console.error(error);
      req.session.errorMessage = `Une erreur est survenue lors de la récupération des réservations : ${error.message}`;
      res.redirect('/admin/bookings');
    }
  },

  updateBooking: async (req, res) => {
    try {
      const bookingId = req.params.id;
      const { visitors, date, client_id, status } = req.body;

      // === Input Validations ===

      // Check if booking ID and required fields are provided
      if (!bookingId) {
        req.session.errorMessage =
          'Aucune réservation sélectionnée pour la mise à jour.';
        return res.redirect('/admin/bookings');
      }
      if (!client_id || !visitors || !date || !status) {
        req.session.errorMessage =
          'Tous les champs sont requis pour mettre à jour la réservation.';
        return res.redirect('/admin/bookings');
      }

      // Ensure visitors is a positive integer
      if (!Number.isInteger(+visitors) || visitors <= 0) {
        req.session.errorMessage =
          'Le nombre de places doit être un entier positif.';
        return res.redirect('/admin/bookings');
      }

      // Validate date format (YYYY-MM-DD)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        req.session.errorMessage = 'La date doit être au format YYYY-MM-DD.';
        return res.redirect('/admin/bookings');
      }

      // Ensure the date is not in the past
      if (new Date(date) < new Date()) {
        req.session.errorMessage = 'La date doit être dans le futur.';
        return res.redirect('/admin/bookings');
      }

      // Validate status value
      const validStatuses = ['pending', 'used', 'confirmed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        req.session.errorMessage =
          'Le statut de la réservation doit être "pending", "used", "confirmed" ou "cancelled".';
        return res.redirect('/admin/bookings');
      }

      // === Database Validations ===

      // Verify booking existence before updating
      const existingBooking = await Booking.findByPk(bookingId);
      if (!existingBooking) {
        req.session.errorMessage = "La réservation spécifiée n'existe pas.";
        return res.redirect('/admin/bookings');
      }

      // Verify client existence
      const existingClient = await User.findByPk(client_id);
      if (!existingClient) {
        req.session.errorMessage = "Le client spécifié n'existe pas.";
        return res.redirect('/admin/bookings');
      }

      // === Update Booking ===
      await Booking.update(
        { client_id, nb_tickets: visitors, date, status },
        { where: { booking_id: bookingId } }
      );

      req.session.successMessage = 'Réservation mise à jour avec succès.';
      res.redirect('/admin/bookings');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la réservation:', error);
      req.session.errorMessage = `Une erreur est survenue lors de la mise à jour de la réservation : ${error.message}`;
      res.redirect('/admin/bookings');
    }
  },

  createBooking: async (req, res) => {
    try {
      const { client_id, visitors, date, status } = req.body;

      // === Input Validations ===

      // Check if all required fields are provided
      if (!client_id || !visitors || !date || !status) {
        req.session.errorMessage =
          'Tous les champs sont requis pour créer une réservation.';
        return res.redirect('/admin/bookings');
      }

      // Ensure visitors is a positive integer
      if (!Number.isInteger(+visitors) || visitors <= 0) {
        req.session.errorMessage =
          'Le nombre de places doit être un entier positif.';
        return res.redirect('/admin/bookings');
      }

      // Validate date format (YYYY-MM-DD)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        req.session.errorMessage = 'La date doit être au format YYYY-MM-DD.';
        return res.redirect('/admin/bookings');
      }

      // Ensure the date is not in the past
      if (new Date(date) < new Date()) {
        req.session.errorMessage = 'La date doit être dans le futur.';
        return res.redirect('/admin/bookings');
      }

      // Validate status value
      const validStatuses = ['pending', 'used', 'confirmed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        req.session.errorMessage =
          'Le statut de la réservation doit être "pending", "used", "confirmed" ou "cancelled".';
        return res.redirect('/admin/bookings');
      }

      // === Database Validations ===

      // Verify client existence before creating a booking
      const existingUser = await User.findByPk(client_id);
      if (!existingUser) {
        req.session.errorMessage = "Le client spécifié n'existe pas.";
        return res.redirect('/admin/bookings');
      }

      // === Create Booking ===
      await Booking.create({
        client_id,
        nb_tickets: visitors,
        date,
        status,
      });

      req.session.successMessage = 'Réservation créée avec succès.';
      res.redirect('/admin/bookings');
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      req.session.errorMessage = `Une erreur est survenue lors de la création de la réservation : ${error.message}`;
      res.redirect('/admin/bookings');
    }
  },

  deleteBooking: async (req, res) => {
    try {
      const bookingId = req.params.id;

      // === Input Validation ===
      if (!bookingId) {
        req.session.errorMessage =
          'Aucune réservation sélectionnée pour la suppression.';
        return res.redirect('/admin/bookings');
      }

      // === Database Validations ===

      // Verify booking existence before deleting
      const existingBooking = await Booking.findByPk(bookingId);
      if (!existingBooking) {
        req.session.errorMessage = "La réservation spécifiée n'existe pas.";
        return res.redirect('/admin/bookings');
      }

      // === Delete Booking ===
      await Booking.destroy({ where: { booking_id: bookingId } });

      req.session.successMessage = 'Réservation supprimée avec succès.';
      res.redirect('/admin/bookings');
    } catch (error) {
      console.error('Erreur lors de la suppression de la réservation:', error);
      req.session.errorMessage = `Une erreur est survenue lors de la suppression de la réservation : ${error.message}`;
      res.redirect('/admin/bookings');
    }
  },
};

export default adminBookingController;
