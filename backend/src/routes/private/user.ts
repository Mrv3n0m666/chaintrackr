import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import {
  getAllUsers,
  getUserById,
  deleteUser,
} from '../../controllers/userController';

const router = Router();

router.use(authMiddleware);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

export default router;
