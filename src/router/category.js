import { Router } from 'express';
import categoryController from '../controllers/api/categoryController.js';
import cw from '../utils/controllerWrapper.js';

const router = Router();

router.get('/', cw(categoryController.getAll));
router.get('/:id', cw(categoryController.getOne));
router.post('/', cw(categoryController.create));
router.patch('/', cw(categoryController.update));
router.delete('/', cw(categoryController.delete));

export default router;
