import Express from 'express';

import checkController from '../controllers/setup/check';
import configureController from '../controllers/setup/configure';
import editController from '../controllers/setup/edit';
import getController from '../controllers/setup/get';

const router = Express.Router();

router.get('/check', checkController);
router.get('/', getController);
router.post('/', configureController);
router.patch('/', editController);

export default router;
