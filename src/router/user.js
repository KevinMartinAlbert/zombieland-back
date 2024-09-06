import { Router } from 'express';
import userController from '../controllers/api/userController.js';
import cw from '../utils/controllerWrapper.js';
import checkJWT from '../middlewares/CheckJWT.js';

const router = Router();

router.get('/', cw(userController.getAll));
router.get('/:id', cw(userController.getOne));
router.post('/', cw(userController.create));
router.patch('/:id/update', cw(userController.update));
router.post('/send-reset-email', cw(userController.sendResetEmail));
router.post('/reset-password', cw(userController.resetPassword));
router.delete('/:id/delete', cw(userController.delete));

export default router;
