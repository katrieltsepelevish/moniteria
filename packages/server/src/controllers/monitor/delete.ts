import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { pingMonitorsManager } from '../../PingMonitorsManager';
import Monitor from '../../models/monitor';
import validator from '../../helpers/validator';
import Heartbeat from '../../models/heartbeat';

const schema = Joi.object({
  _id: Joi.string().required(),
});

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate
    await validator(req.body, schema);

    const { _id } = req.body;

    await Monitor.findByIdAndRemove(_id);
    await Heartbeat.deleteMany({
      monitorId: _id,
    });

    pingMonitorsManager().stopById(_id);

    return res.status(200).send('OK');
  } catch (err) {
    next(err);
  }
};
