import Express from 'express';

import loginController from '../controllers/auth/login';
import registerController from '../controllers/auth/register';

const router = Express.Router();

router.post('/login', loginController);
router.post('/register', registerController);

export default router;
