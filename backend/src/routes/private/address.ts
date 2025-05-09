import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import {
  getAll,
  getByAddress,
  addAddress,
  updateAddress,
  deleteAddress,
  getAddressValueController,
} from '../../controllers/addressController';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAll);
router.get('/:address', getByAddress);
router.post('/', addAddress);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);
router.get('/:address/value', getAddressValueController); // 👈 Tambahan

export default router;