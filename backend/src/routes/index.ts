// src/routes/index.ts
import { Router } from 'express';
import authRoutes from './auth';
import privateAddressRoutes from './private/address';
import privateUserRoutes from './private/user';
import publicAddressRoutes from './public/address';

const router = Router();

router.use('/auth', authRoutes);
router.use('/address', privateAddressRoutes);
router.use('/users', privateUserRoutes);
router.use('/public', publicAddressRoutes);

export default router;
