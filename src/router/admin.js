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

router.post('/update-activity/:id', ensureIsAdmin, adminActivityController.updateActivity);
router.post('/create-activity', ensureIsAdmin, adminActivityController.createActivity);
router.post('/delete-activity/:id', ensureIsAdmin, adminActivityController.deleteActivity);

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
router.post(
  '/delete-member/:id',
  ensureIsAdmin,
  adminMemberController.deleteMember
);
router.post(
  '/update-member/:id',
  ensureIsAdmin,
  adminMemberController.updateMember
);
router.post(
  '/update-category/:id',
  ensureIsAdmin,
  cw(adminCategoryController.updateCategory)
);
router.delete(
  '/delete-category/:id',
  ensureIsAdmin,
  cw(adminCategoryController.deleteCategory)
);
router.post(
  '/create-category',
  ensureIsAdmin,
  cw(adminCategoryController.createCategory)
);

export default router;
