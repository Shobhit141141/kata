import dotenv from 'dotenv';
import app from './src/app.js';
import { connectDB } from './src/config/db.js';
import { CONSTANTS } from './src/config/constants.js';
import logger from './src/utils/logger.js';

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();
    const PORT = CONSTANTS.PORT || 4000;
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();
