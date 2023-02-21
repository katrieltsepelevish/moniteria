import Express from 'express';

import authRoutes from './auth';
import setupRoutes from './setup';
import monitorRouters from './monitor';

const router = Express.Router();

router.use('/auth', authRoutes);
router.use('/setup', setupRoutes);
router.use('/monitor', monitorRouters);

export default router;
