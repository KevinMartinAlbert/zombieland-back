/* eslint-disable */

import z from 'zod';
import { User } from '../models/index.js';
import Scrypt from '../utils/scrypt.js';

  const loginSchema = z.object({
    email: z.string().email('Doit être un email valide'),
    password: z.string('Doit être une chaîne de caractères'),
  });

const adminPanelController = {

  // Home page controller
  homePage: (req, res) => {
    res.render('index');
  },

  categoriesPage: (req, res) => {
    res.render('admin-category');
  },

  bookingsPage: (req, res) => {
    res.render('admin-booking');
  },

  membersPage: (req, res) => {
    res.render('admin-members');
  },

  pricesPage: (req, res) => {
    res.render('admin-price');
  },

  activitiesPage: (req, res) => {
    res.render('admin-activity');
  },

  async loginAction (req, res) {
    const resultValidation = loginSchema.safeParse(req.body);

    if (!resultValidation.success) {
      res.send(resultValidation.error.errors);
      return;
    }

    const dataValidated = resultValidation.data;

    try {
      // Je vais récupérer depuis ma base de données l'utilisateur qui a l'email donné
      const user = await User.findOne({
        where: {
          email: dataValidated.email,
        },
      });

      if (!user) {
        res.render('login', {
          errors: [
            {
              message: 'Identifiants incorrects',
              path: [],
            },
          ],
        });
        return;
      }

      // Je vais vérifier que le mot de passe donné correspond à celui en base de données
       const isValidPassword = Scrypt.verify(
         dataValidated.password,
         user.password,
       );


      if (!isValidPassword) {
        res.render('login', {
          errors: [
            {
              message: 'Identifiants incorrects',
              path: [],
            },
          ],
        });
        return;
      }

      // J'enregistre l'id de l'utilisateur en session
      req.session.userId = user.user_id;

      // Je redirige l'utilisateur vers la page d'accueil
      res.redirect('/admin');
    } catch (error) {
      console.trace(error);
      res
        .status(500)
        .render('500', {
          error: `Une erreur est survenue lors de l'authentification \n ${error}`,
        });
    }
  },

  logout: (req, res) => {
    req.session.destroy()
    res.redirect('/admin');
  },

};

export default adminPanelController;