import { Router } from 'express';
import { getPublicAddress } from '../controllers/publicAddressController';

const router = Router();

router.get('/address/:address', getPublicAddress);

export default router;
