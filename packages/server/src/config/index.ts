import Dotenv from 'dotenv';

const config = {
  environment: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  databaseUri: process.env.DATABASE_URI || 'mongodb://localhost/moniteria',
  jwtSecret: process.env.JWT_SECRET || 'jwt-secret',
  isTest: process.env.NODE_ENV === 'test' ?? false,
};

export default config;
