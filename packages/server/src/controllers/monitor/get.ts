import { NextFunction, Request, Response } from 'express';

import Monitor from '../../models/monitor';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const monitors = await Monitor.find();

    return res.status(200).send({ monitors });
  } catch (err) {
    next(err);
  }
};
