import { z } from 'zod';
import { User } from '../../models/index.js';
import Scrypt from '../../utils/scrypt.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET =
  process.env.JWT_SECRET || 'unSecretQuiDevraEtreFortEnProduction'; // Securely manage this in production
const JWT_EXPIRY = '288h';

const loginSchema = z.object({
  email: z.string().email('Must be a valid email'),
  password: z.string('Must be a string'),
});

const loginController = {
  async login(req, res, next) {
    try {
      const validatedData = loginSchema.parse(req.body);

      const user = await User.findOne({
        where: { email: validatedData.email },
      });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isPasswordValid = Scrypt.verify(
        validatedData.password,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY }
      );

      res.json({ message: 'Login successful', token });
    } catch (error) {
      next(error);
    }
  },
};

export default loginController;
