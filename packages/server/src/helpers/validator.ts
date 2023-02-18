import { Request } from 'express';
import Joi from 'joi';

import ValidationException from '../exceptions/validation';

const validator = async (body: Request['body'], schema: Joi.Schema) => {
  try {
    // Validate body with provided schema
    await schema.validateAsync(body);
  } catch (err: any) {
    throw new ValidationException([
      {
        field: String(err.details[0].path[0]),
        message: err.details[0].message,
      },
    ]);
  }
};

export default validator;
