import { NextFunction, Request, Response } from 'express';

import Setup from '../../models/setup';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await Setup.countDocuments();

    const hasSetup = count > 0;

    return res.status(200).send({ completed: hasSetup });
  } catch (err) {
    next(err);
  }
};
