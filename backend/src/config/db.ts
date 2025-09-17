import mongoose from 'mongoose';
import { CONSTANTS } from './constants.js';
import logger from '../utils/logger.js';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const mongoURI = CONSTANTS.MONGO_URI;

    const db = await mongoose.connect(mongoURI, {
      bufferCommands: false,
    });

    isConnected = db.connections[0].readyState === 1;

    if (isConnected) {
      logger.info('MongoDB connected');
    } else {
      logger.error('MongoDB not connected');
    }
  } catch (error) {
    logger.error('Error connecting to MongoDB', error as Error);
    throw error;
  }
};

const disconnectDB = async () => {
  if (!isConnected) return;

  try {
    await mongoose.disconnect();
    isConnected = false;
    logger.info('MongoDB disconnected');
  } catch (error) {
    logger.error('Error disconnecting from MongoDB', error as Error);
    throw error;
  }
}

export { connectDB, disconnectDB };
