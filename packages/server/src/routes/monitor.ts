import Express from 'express';

import authorized from '../middlewares/authorized';
import createController from '../controllers/monitor/create';
import getController from '../controllers/monitor/get';
import updateController from '../controllers/monitor/update';

const router = Express.Router();

router.get('/', authorized, getController);
router.post('/', authorized, createController);
router.patch('/', authorized, updateController);

export default router;
