import { Express } from 'express';

import routes from '../routes';

export const apiPrefix = '/api/v1';

export default (app: Express) => {
  app.use(apiPrefix, routes);
};
