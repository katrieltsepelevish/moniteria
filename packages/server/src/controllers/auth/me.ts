import { NextFunction, Request, Response } from 'express';

import User from '../../models/user';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.auth_token;

    const verifiedUser = await User.verifyToken(token);

    const userWithoutPassword = verifiedUser?.toObject();
    delete userWithoutPassword!.password;

    return res.status(200).send({ user: userWithoutPassword });
  } catch (err) {
    next(err);
  }
};
