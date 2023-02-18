import Mongoose, { Mongoose as MongooseInstance } from 'mongoose';

import config from '../config';
import logger from '../logger';

export let mongoClient: MongooseInstance;

export default async () => {
  Mongoose.set('strictQuery', false);

  mongoClient = await Mongoose.connect(config.databaseUri);

  logger.info('Trying to connect MongoDB...');

  logger.info('💾 Connected to MongoDB');

  mongoClient.connection.on('disconnected', () => {
    logger.info('🔌 Disconnected from MongoDB');
  });

  mongoClient.connection.on('error', (err: any) => {
    logger.error('❌ MongoDB failed', {
      message: err?.message ?? err,
      trace: err?.trace,
    });
  });

  mongoClient.connection.on('SIGINT', () => {
    mongoClient.connection.close(() => {
      logger.info('💀 MongoDB connection closed through app terminal');
      process.exit(1);
    });
  });
};
