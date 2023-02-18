import { Express, NextFunction, Request, Response } from 'express';

export default (app: Express) => {
  app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err && err.type === 'ValidationException') {
      return res.status(422).send({
        message: err?.message,
        errors: err?.errors,
      });
    }

    next();
  });
};
