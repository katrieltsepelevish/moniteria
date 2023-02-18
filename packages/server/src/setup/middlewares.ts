import { Express } from 'express';
import BodyParser from 'body-parser';
import Cors from 'cors';
import Morgan from 'morgan';

import config from '../config';

export default (app: Express) => {
  // support parsing of application/json type post data
  app.use(BodyParser.json());
  //support parsing of application/x-www-form-urlencoded post data
  app.use(BodyParser.urlencoded({ extended: true }));

  app.use(Morgan('common', { skip: () => config.isTest }));
  app.use(Cors());
};
