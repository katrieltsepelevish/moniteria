import Express from 'express';

import setupValidationHandler from './setup/validation-handler';
import setupErrorHandler from './setup/error-handler';
import setupNotFoundHandler from './setup/notfound-handler';
import setupMiddlewares from './setup/middlewares';
import setupDatabase from './setup/database';
import setupRouter from './setup/router';
import setupSocket from './setup/socket';
import setupMonitor from './setup/monitor';

export default async () => {
  const app = Express();

  setupMiddlewares(app);

  await setupDatabase();

  const [server, io] = setupSocket(app);
  setupMonitor(io);

  setupRouter(app);
  setupValidationHandler(app);

  // setupNotFoundHandler(app);
  setupErrorHandler(app);

  return server;
};
