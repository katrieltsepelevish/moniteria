import { Express, NextFunction, Request, Response } from 'express';

import HttpException from '../exceptions/http';

export default (app: Express) => {
  // Catch 404 errors and forward to error handler
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    next(new HttpException(404, 'Not Found'));
  });
};
