import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import validator from '../../helpers/validator';
import ValidationException from '../../exceptions/validation';
import Monitor from '../../models/monitor';

const schema = Joi.object({
  name: Joi.string().required(),
  uri: Joi.string().required().uri(),
  type: Joi.string().required().valid('https'),
  heartbeatInterval: Joi.number().min(30).max(120).required(),
  retries: Joi.number().min(0).max(3).required(),
});

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate
    await validator(req.body, schema);

    const monitor = await Monitor.findOne({
      uri: req.body.uri,
    });

    if (monitor) {
      throw new ValidationException([
        {
          message: 'A monitor with this URI already exists.',
          field: 'uri',
        },
      ]);
    }

    const newMonitor = await Monitor.create({ ...req.body });

    return res.status(201).send({ monitor: newMonitor });
  } catch (err) {
    next(err);
  }
};
