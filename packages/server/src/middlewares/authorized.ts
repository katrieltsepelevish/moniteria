import { NextFunction, Request, Response } from 'express';

import User from '../models/user';

const authorized = async (req: Request, res: Response, next: NextFunction) => {
  // Extract token from cookie
  const token = req.cookies?.auth_token;

  const user = await User.verifyToken(token);

  if (user) {
    return next();
  }

  return res.status(401).send({
    message: 'Unauthorized',
  });
};

export default authorized;
