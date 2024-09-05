import { Router } from 'express';

import adminActivityController from '../controllers/admin/adminActivityController.js';
import adminBookingController from '../controllers/admin/adminBookingController.js';
import adminCategoryController from '../controllers/admin/adminCategoryController.js';
import adminLoginController from '../controllers/admin/adminLoginController.js';
import adminMemberController from '../controllers/admin/adminMemberController.js';
import adminPanelController from '../controllers/admin/adminPanelController.js';
import adminPriceController from '../controllers/admin/adminPriceController.js';

import cw from '../utils/controllerWrapper.js';
import ensureIsAdmin from '../middlewares/adminMiddleware.js';

const router = Router();
router.get('/', adminPanelController.homePage);
router.post('/login', adminLoginController.loginAction);
router.get('/logout', ensureIsAdmin, adminLoginController.logout);
router.get('/bookings', ensureIsAdmin, adminBookingController.bookingsPage);
router.get('/prices', ensureIsAdmin, adminPriceController.pricesPage);
router.get('/members', ensureIsAdmin, adminMemberController.membersPage);
router.get(
  '/categories',
  ensureIsAdmin,
  adminCategoryController.categoriesPage
);
router.get(
  '/activities',
  ensureIsAdmin,
  adminActivityController.activitiesPage
);
router.post(
  '/delete-booking/:id',
  ensureIsAdmin,
  adminBookingController.deleteBooking
);
router.post(
  '/update-booking/:id',
  ensureIsAdmin,
  adminBookingController.updateBooking
);
router.post(
  '/create-booking',
  ensureIsAdmin,
  adminBookingController.createBooking
);

export default router;
