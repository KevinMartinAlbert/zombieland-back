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
      // Set error message for tooltip display on page redirect
      req.session.errorMessage = `Une erreur est survenue lors de la récupération des réservations : ${error.message}`;
      res.redirect('/admin/bookings');
    }
  },

  updateBooking: async (req, res) => {
    try {
      const bookingId = req.params.id;
      const { visitors, date, client_id } = req.body;

      // Check if booking ID and required fields are provided
      if (!bookingId) {
        req.session.errorMessage = 'Aucune réservation sélectionnée pour la mise à jour.';
        return res.redirect('/admin/bookings');
      }
      if (!client_id || !visitors || !date) {
        req.session.errorMessage = 'Tous les champs sont requis pour mettre à jour la réservation.';
        return res.redirect('/admin/bookings');
      }

      // Ensure number of visitors is not negative
      if (visitors < 0) {
        req.session.errorMessage = 'Le nombre de places ne peut pas être négatif.';
        return res.redirect('/admin/bookings');
      }

      // Verify booking existence before updating
      const existingBooking = await Booking.findByPk(bookingId);
      if (!existingBooking) {
        req.session.errorMessage = 'La réservation spécifiée n\'existe pas.';
        return res.redirect('/admin/bookings');
      }

      // Update the booking details
      await Booking.update(
        { client_id, nb_tickets: visitors, date },
        { where: { booking_id: bookingId } }
      );

      // Set success message and redirect
      req.session.successMessage = 'Réservation mise à jour avec succès.';
      res.redirect('/admin/bookings');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la réservation:', error);
      // Set error message for tooltip display on page redirect
      req.session.errorMessage = `Une erreur est survenue lors de la mise à jour de la réservation : ${error.message}`;
      res.redirect('/admin/bookings');
    }
  },

  createBooking: async (req, res) => {
    try {
      const { client_id, visitors, date } = req.body;

      // Check if all required fields are provided
      if (!client_id || !visitors || !date) {
        req.session.errorMessage = 'Tous les champs sont requis pour créer une réservation.';
        return res.redirect('/admin/bookings');
      }

      // Ensure number of visitors is not negative
      if (visitors < 0) {
        req.session.errorMessage = 'Le nombre de places ne peut pas être négatif.';
        return res.redirect('/admin/bookings');
      }

      // Verify client existence before creating a booking
      const existingUser = await User.findByPk(client_id);
      if (!existingUser) {
        req.session.errorMessage = 'Le client spécifié n\'existe pas.';
        return res.redirect('/admin/bookings');
      }

      // Create a new booking in the database
      await Booking.create({
        client_id,
        nb_tickets: visitors,
        date,
        status: 'pending',
      });

      // Set success message and redirect
      req.session.successMessage = 'Réservation créée avec succès.';
      res.redirect('/admin/bookings');
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      // Set error message for tooltip display on page redirect
      req.session.errorMessage = `Une erreur est survenue lors de la création de la réservation : ${error.message}`;
      res.redirect('/admin/bookings');
    }
  },

  deleteBooking: async (req, res) => {
    try {
      const bookingId = req.params.id;

      // Check if booking ID is provided
      if (!bookingId) {
        req.session.errorMessage = 'Aucune réservation sélectionnée pour la suppression.';
        return res.redirect('/admin/bookings');
      }

      // Attempt to delete the booking
      const deletedBooking = await Booking.destroy({
        where: { booking_id: bookingId },
      });

      if (deletedBooking) {
        // Set success message for deletion
        req.session.successMessage = 'Réservation supprimée avec succès.';
        res.redirect('/admin/bookings');
      } else {
        // Set error message if booking not found
        req.session.errorMessage = 'Réservation non trouvée.';
        res.redirect('/admin/bookings');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la réservation:', error);
      // Set error message for tooltip display on page redirect
      req.session.errorMessage = `Une erreur est survenue lors de la suppression de la réservation : ${error.message}`;
      res.redirect('/admin/bookings');
    }
  },
};

export default adminBookingController;
