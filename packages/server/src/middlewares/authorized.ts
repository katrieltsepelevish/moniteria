import { NextFunction, Request, Response } from 'express';

import User from '../models/user';

const authorized = async (req: Request, res: Response, next: NextFunction) => {
  // Extract token from authorization header
  const [, token] = (req.headers.authorization || '').split(' ');

  const user = await User.verifyToken(token);

  if (user) {
    return next();
  }

  res.status(401).send({
    message: 'Unauthorized',
  });
};

export default authorized;
