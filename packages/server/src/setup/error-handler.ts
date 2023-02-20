import { Express, NextFunction, Request, Response } from 'express';

export default (app: Express) => {
  // Catch 404 errors and forward to error handler
  app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.status || 500).json({ message: err.message });
  });
};
