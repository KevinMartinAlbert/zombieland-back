import { Router } from 'express';
import activityRouter from './activity.js';
import adminRouter from './admin.js';
import bookingRouter from './booking.js';
import categoryRouter from './category.js';
import userRouter from './user.js';
import loginRouter from './login.js';
import signinRouter from './signin.js';

const router = Router();

router.use('/admin', adminRouter);
router.use('/activities', activityRouter);
router.use('/booking', bookingRouter);
router.use('/account', userRouter);
router.use('/category', categoryRouter);
router.use('/signin', signinRouter);
router.use('/login', loginRouter);

export default router;
