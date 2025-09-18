import { Request, Response, NextFunction } from 'express';

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.isAdmin) {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Admin access required' });
};

export default adminMiddleware;
