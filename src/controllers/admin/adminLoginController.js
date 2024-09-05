import z from 'zod';
import { User } from '../../models/index.js';
import Scrypt from '../../utils/scrypt.js';

const loginSchema = z.object({
  email: z.string().email('Doit être un email valide'),
  password: z.string().min(1, 'Le mot de passe ne peut pas être vide'),
});

const adminLoginController = {
  // LOGIN
  loginAction: async (req, res) => {
    const resultValidation = loginSchema.safeParse(req.body);

    if (!resultValidation.success) {
      req.session.errorMessage = 'Problème avec la connexion : Données de connexion non valides.';
      return res.redirect('/admin');
    }

    const dataValidated = resultValidation.data;

    try {
      // Rechercher l'utilisateur par email
      const user = await User.findOne({
        where: {
          email: dataValidated.email,
        },
      });

      if (!user) {
        req.session.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
        return res.redirect('/admin'); // Redirection après avoir défini l'erreur dans la session
      }

      // Vérification du mot de passe
      const isValidPassword = Scrypt.verify(
        dataValidated.password,
        user.password
      );

      if (!isValidPassword) {
        req.session.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
        return res.redirect('/admin'); // Redirection après avoir défini l'erreur dans la session
      }

      // Enregistrer l'ID de l'utilisateur dans la session
      req.session.userId = user.user_id;

      // Définir un message de succès pour l'utilisateur connecté
      req.session.successMessage = 'Connexion réussie. Bienvenue !';

      // Rediriger vers la page des réservations
      return res.redirect('/admin/bookings');
    } catch (error) {
      console.trace(error);
      req.session.errorMessage = `Problème avec la connexion : ${error.message}`;
      return res.redirect('/admin'); // Redirection après avoir défini l'erreur dans la session
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.redirect('/admin');
  },
};

export default adminLoginController;
