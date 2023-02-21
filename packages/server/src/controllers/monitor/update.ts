import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import validator from '../../helpers/validator';
import ValidationException from '../../exceptions/validation';
import Monitor from '../../models/monitor';

const schema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string(),
  uri: Joi.string().uri(),
  type: Joi.string().valid('https'),
  heartbeatInterval: Joi.number().min(30).max(120),
  retries: Joi.number().min(0).max(3),
  active: Joi.boolean(),
});

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate
    await validator(req.body, schema);

    const monitor = await Monitor.findById(req.body._id);

    if (!monitor) {
      throw new ValidationException([
        {
          message: 'Monitor not found.',
          field: 'uri',
        },
      ]);
    }

    const newMonitor = await Monitor.findByIdAndUpdate(req.body._id, {
      ...req.body,
    });

    return res.status(200).send({ monitor: newMonitor });
  } catch (err) {
    next(err);
  }
};
