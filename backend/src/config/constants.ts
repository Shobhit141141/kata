import dotenv from 'dotenv';
dotenv.config();
const requiredEnvVars = ['MONGO_URI'];
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.log(process.env[key]);
    throw new Error(`Environment variable ${key} is required but not set.`);
  }
});

export const CONSTANTS = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/previewer_v15',
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'your_default_jwt_secret',

  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
};
