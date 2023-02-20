import Express from 'express';

import authRoutes from './auth';
import setupRoutes from './setup';

const router = Express.Router();

router.use('/auth', authRoutes);
router.use('/setup', setupRoutes);

export default router;
