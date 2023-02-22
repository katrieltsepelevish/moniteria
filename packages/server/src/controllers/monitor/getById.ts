import { NextFunction, Request, Response } from 'express';

import Monitor from '../../models/monitor';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const monitor = await Monitor.findById(id);

    return res.status(200).send({ monitor });
  } catch (err) {
    next(err);
  }
};
