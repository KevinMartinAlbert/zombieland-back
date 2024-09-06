import { Router } from 'express';
import cw from '../utils/controllerWrapper.js';
import contactController from '../controllers/api/contactController.js';

const router = Router();

router.post('/', cw(contactController.sendContactForm));

export default router;
