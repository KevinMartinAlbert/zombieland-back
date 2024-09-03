import z from 'zod';
import { User } from '../../models/index.js'
import Scrypt from '../utils/scrypt.js';

// Pour valider nos données, on va utiliser une librairie de schéma de validation appelée zod.
// Ici je créer un schéma qui correspond à ce que je veux valider pour la route POST /signup
const passwordSchema = z
  .string()
  .min(6, 'Doit contenir au moins 6 caractères')
  .regex(/[0-9]/, 'Doit contenir au moins un chiffre')
  .regex(/[A-Z]/, 'Doit contenir au moins une majuscule')
  .regex(/[a-z]/, 'Doit contenir au moins une minuscule');

const signupSchema = z.object({
  email: z.string().email('Doit être un email valide'),
  password: passwordSchema,
  firstname: z.string('Doit être une chaîne de caractères'),
  lastname: z.string('Doit être une chaîne de caractères'),
  confirmation: passwordSchema,
});

const loginSchema = z.object({
  email: z.string().email('Doit être un email valide'),
  password: z.string('Doit être une chaîne de caractères'),
});

export async function signup(req, res) {
  try {
    validatedData = signupSchema.parse(req.body);

    if(validatedData.password !== validatedData.confirmation) {
      return res.status(400).json({ error: 'Passwords do not match'});
    };

    const existingUser = await User.findOne(
      {
        where: {
          email: validatedData.email,
        }
      }
    );
    if(existingUser) {
      return res.status(400).json({ error: 'User already exists'});
    }

    const hashedPassword = Scrypt.hash(validatedData.password);

    const newUser = await User.create({
      email: validatedData.email,
      password: hashedPassword,
      firstname: validatedData.firstname,
      lastname: validatedData.lastname,
    });

    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  };

  export async function login(req, res) {
    try {
      const validatedData = loginSchema.parse(req.body);
  
      const user = await User.findOne({ where: { email: validatedData.email } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const isPasswordValid = Scrypt.verify(validatedData.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      req.session.userId = user.id;
  
      res.json({ message: 'Login successful' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}