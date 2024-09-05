import { Router } from 'express';
import activityController from '../controllers/api/activityController.js';
import cw from '../utils/controllerWrapper.js';

const router = Router();

router.get('/', cw(activityController.getAll));
router.get('/:id', cw(activityController.getOneActivity));
router.get('/category/:id', cw(activityController.getActivitiesByCategory));

export default router;
