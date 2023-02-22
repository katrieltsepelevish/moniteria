import Express from 'express';

import authorized from '../middlewares/authorized';
import createController from '../controllers/monitor/create';
import getController from '../controllers/monitor/get';
import getByIdController from '../controllers/monitor/getById';
import updateController from '../controllers/monitor/update';
import deleteController from '../controllers/monitor/delete';

const router = Express.Router();

router.get('/', authorized, getController);
router.get('/:id', authorized, getByIdController);
router.post('/', authorized, createController);
router.patch('/', authorized, updateController);
router.delete('/', authorized, deleteController);

export default router;
