import Express from 'express';

import loginController from '../controllers/auth/login';
import registerController from '../controllers/auth/register';
import meController from '../controllers/auth/me';
import logoutController from '../controllers/auth/logout';
import authorized from '../middlewares/authorized';

const router = Express.Router();

router.post('/login', loginController);
router.post('/register', registerController);
router.get('/me', authorized, meController);
router.post('/logout', authorized, logoutController);

export default router;
