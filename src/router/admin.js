import { Router } from 'express';
import adminPanelController from '../controllers/adminPanelController.js';
import cw from '../utils/controllerWrapper.js';
import ensureIsAdmin from '../middlewares/adminMiddleware.js';

const router = Router();
router.get('/', cw(adminPanelController.homePage));
router.post('/login', cw(adminPanelController.loginAction));
router.get('/logout', ensureIsAdmin, cw(adminPanelController.logout));
router.get('/bookings', ensureIsAdmin, cw(adminPanelController.bookingsPage));
router.get('/prices', ensureIsAdmin, cw(adminPanelController.pricesPage));
router.get('/members', ensureIsAdmin, cw(adminPanelController.membersPage));
router.get('/categories', ensureIsAdmin, cw(adminPanelController.categoriesPage));
router.get('/activities', ensureIsAdmin, cw(adminPanelController.activitiesPage));

export default router;