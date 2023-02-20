import { Request } from 'express';
import Joi from 'joi';

import ValidationException from '../exceptions/validation';

const validator = async (body: Request['body'], schema: Joi.Schema) => {
  try {
    // Validate body with provided schema
    await schema.validateAsync(body, {
      // Return multiple errors instead of single
      abortEarly: false,
      // continue validation after encountering an error
      skipFunctions: true,
    });
  } catch (err: any) {
    if (err?.details) {
      throw new ValidationException(
        err.details.map(({ message, path }: { message: string; path: [] }) => {
          return {
            field: String([path]),
            message: message!.replace(/["]/g, ''),
          };
        })
      );
    }
  }
};

export default validator;
