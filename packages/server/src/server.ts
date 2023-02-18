import Express from 'express';

import setupValidationHandler from './setup/validation-handler';
import setupMiddlewares from './setup/middlewares';
import setupDatabase from './setup/database';
import setupRouter from './setup/router';

export default async () => {
  const app = Express();

  await setupDatabase();

  setupMiddlewares(app);

  setupRouter(app);
  setupValidationHandler(app);

  return app;
};
