import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import Bcrypt from 'bcrypt';

import User from '../../models/user';
import validator from '../../helpers/validator';
import ValidationException from '../../exceptions/validation';

const schema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate
    await validator(req.body, schema);

    // Find user
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user || !Bcrypt.compareSync(req.body.password, user!.password)) {
      throw new ValidationException([
        {
          message: 'These credentials do not match our records.',
          field: 'email',
        },
      ]);
    }

    res.status(200).send({ user, token: user!.generateToken() });
  } catch (err) {
    next(err);
  }
};
