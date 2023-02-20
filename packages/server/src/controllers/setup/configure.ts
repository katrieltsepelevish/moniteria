import { NextFunction, Request, Response } from 'express';

import Setup from '../../models/setup';
import HttpException from '../../exceptions/http';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { completed } = req.body;

    const count = await Setup.countDocuments();

    const hasSetup = count > 0;

    if (hasSetup) throw new HttpException(500, 'Setup already configured.');

    const setup = await Setup.create({
      completed,
    });

    return res.status(200).send({ setup });
  } catch (err) {
    next(err);
  }
};
