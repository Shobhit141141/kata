import { Express } from 'express';
import { handleResponse } from '../utils/responseHandler.js';
import userRoutes from './auth.routes.js';
import sweetRoutes from './sweets.routes.js';
import inventoryRoutes from './inventory.routes.js';

const registerRoutes = (app: Express): void => {
  app.use('/api/auth', userRoutes);
  app.use('/api/sweets', sweetRoutes);
  app.use('/api/inventory', inventoryRoutes);

  app.get('/health', (_, res) => {
    handleResponse(res, 200, true, 'Server is healthy');
  });
  app.all('/api/*', (_, res) => {
    handleResponse(res, 404, false, 'API Route not found');
  });
};

export default registerRoutes;
