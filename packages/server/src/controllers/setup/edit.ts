import { NextFunction, Request, Response } from 'express';

import Setup from '../../models/setup';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { configured } = req.body;

    const setup = await Setup.findOne();

    setup!.completed = configured;

    await setup!.save();

    return res.status(200).send({ setup });
  } catch (err) {
    next(err);
  }
};
