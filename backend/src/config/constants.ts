import dotenv from 'dotenv';
dotenv.config();
const requiredEnvVars = ['MONGO_URI','GEMINI_API_KEY','CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
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

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'your_cloud_name',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || 'your_api_key',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || 'your_api_secret',

  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',

  GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'your_gemini_api_key',
};
