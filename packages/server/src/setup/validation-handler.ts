import { Express, NextFunction, Request, Response } from 'express';

interface IError {
  field: string;
  message: string;
}

export default (app: Express) => {
  app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err && err.type === 'ValidationException') {
      return res.status(422).send({
        message: err?.message,
        errors: err?.errors?.reduce(
          (prevErrors: IError[], error: IError) => ({
            ...prevErrors,
            [error.field]: error.message,
          }),
          {}
        ),
      });
    }

    next();
  });
};
