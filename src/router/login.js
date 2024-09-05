import { Router } from 'express';
import loginController from '../controllers/api/loginController.js'
import checkJWT from '../middlewares/CheckJWT.js';
import cw from '../utils/controllerWrapper.js';
import bookingController from '../controllers/api/bookingController.js';

const router = Router();

router.post('/', cw(loginController.login));

router.get('/booking', checkJWT, cw(bookingController.getAllBookings))

export default router;
