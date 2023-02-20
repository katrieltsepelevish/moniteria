import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import Bcrypt from 'bcrypt';

import User from '../../models/user';
import validator from '../../helpers/validator';
import ValidationException from '../../exceptions/validation';

const schema = Joi.object({
  name: Joi.string().required(),
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

    if (user) {
      throw new ValidationException([
        {
          message: 'A user with this email already exists.',
          field: 'email',
        },
      ]);
    }

    const salt = await Bcrypt.genSalt();
    const hashedPassword = await Bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // Convert to object from document and remove password field
    const userWithoutPassword = newUser.toObject();
    delete userWithoutPassword!.password;

    return res
      .cookie('auth_token', newUser!.generateToken(), {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30d
      })
      .status(201)
      .send({ user: userWithoutPassword });
  } catch (err) {
    next(err);
  }
};
