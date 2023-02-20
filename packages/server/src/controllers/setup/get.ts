import { NextFunction, Request, Response } from 'express';

import Setup from '../../models/setup';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const setup = await Setup.findOne();

    return res.status(200).send({ setup });
  } catch (err) {
    next(err);
  }
};
