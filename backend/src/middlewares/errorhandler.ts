import { Request, Response, NextFunction } from 'express';
import { handleResponse } from '../utils/responseHandler.js';
import logger from '../utils/logger.js';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error('Unhandled Server Error:', err);
  handleResponse(res, 500, false, 'Internal server error');
};
