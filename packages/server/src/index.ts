import server from './server';
import logger from './logger';
import config from './config';

(async () => {
  const app = await server();

  app!.listen(config.port, () => {
    logger.info(`🔗 Socket running on port ${config.port}`);
    logger.info(`🚀 Moniteria running on port ${config.port}`);
    logger.info(`🌎 Visit http://localhost:${config.port}/`);
  });
})();
