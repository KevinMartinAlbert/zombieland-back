import { User } from '../../models/index.js';

const adminMemberController = {
  membersPage: async (req, res) => {
    try {
      // Fetch all members
      const members = await User.findAll({
        where: { role: 'user' },
        order: [['user_id', 'ASC']],
        attributes: ['user_id', 'first_name', 'last_name', 'email'],
      });

      // Render the members page with fetched data
      res.render('admin-members', {
        members,
        currentPage: 'members',
      });
    } catch (error) {
      console.error(error);
      req.session.errorMessage = `Une erreur est survenue lors de la récupération des membres : ${error.message}`;
      res.redirect('/admin/members');
    }
  },

  updateMember: async (req, res) => {
    try {
      const memberId = req.params.id;
      const { first_name, last_name, email } = req.body;

      // === Input Validations ===

      // Check if member ID is provided
      if (!memberId) {
        req.session.errorMessage =
          'Aucun membre sélectionné pour la mise à jour.';
        return res.redirect('/admin/members');
      }

      // Check if all required fields are provided
      if (!first_name || !last_name || !email) {
        req.session.errorMessage =
          'Tous les champs sont requis pour mettre à jour le membre.';
        return res.redirect('/admin/members');
      }

      // Check if first and last names are valid (non-empty, reasonable length)
      if (first_name.length < 2 || first_name.length > 50) {
        req.session.errorMessage =
          'Le prénom doit contenir entre 2 et 50 caractères.';
        return res.redirect('/admin/members');
      }
      if (last_name.length < 2 || last_name.length > 50) {
        req.session.errorMessage =
          'Le nom de famille doit contenir entre 2 et 50 caractères.';
        return res.redirect('/admin/members');
      }

      // Validate email format with regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        req.session.errorMessage = "L'adresse e-mail n'est pas valide.";
        return res.redirect('/admin/members');
      }

      // === Database Validations ===

      // Verify member existence before updating
      const existingMember = await User.findByPk(memberId);
      if (!existingMember) {
        req.session.errorMessage = "Le membre spécifié n'existe pas.";
        return res.redirect('/admin/members');
      }

      // Update the member details
      await User.update(
        { first_name, last_name, email },
        { where: { user_id: memberId } }
      );

      // Set success message and redirect
      req.session.successMessage = 'Membre mis à jour avec succès.';
      res.redirect('/admin/members');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du membre:', error);
      req.session.errorMessage = `Une erreur est survenue lors de la mise à jour du membre : ${error.message}`;
      res.redirect('/admin/members');
    }
  },

  deleteMember: async (req, res) => {
    try {
      const memberId = req.params.id;

      // === Input Validation ===

      // Check if member ID is provided
      if (!memberId) {
        req.session.errorMessage =
          'Aucun membre sélectionné pour la suppression.';
        return res.redirect('/admin/members');
      }

      // === Database Validations ===

      // Verify member existence before deleting
      const existingMember = await User.findByPk(memberId);
      if (!existingMember) {
        req.session.errorMessage = "Le membre spécifié n'existe pas.";
        return res.redirect('/admin/members');
      }

      // Attempt to delete the member
      const deletedMember = await User.destroy({
        where: { user_id: memberId },
      });

      if (deletedMember) {
        req.session.successMessage = 'Membre supprimé avec succès.';
        res.redirect('/admin/members');
      } else {
        req.session.errorMessage = 'Erreur lors de la suppression du membre.';
        res.redirect('/admin/members');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du membre:', error);
      req.session.errorMessage = `Une erreur est survenue lors de la suppression du membre : ${error.message}`;
      res.redirect('/admin/members');
    }
  },
};

export default adminMemberController;
