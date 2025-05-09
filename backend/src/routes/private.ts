// src/routes/private.ts
import { Router } from 'express';
import addressRoutes from './addressRoutes';

const router = Router();

router.use('/address', addressRoutes);

export default router;
