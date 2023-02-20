import { NextFunction, Request, Response } from 'express';

import User from '../../models/user';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.auth_token;

    await User.verifyToken(token);

    return res.clearCookie('auth_token').sendStatus(200);
  } catch (err) {
    next(err);
  }
};
