import { Request, Response, NextFunction } from 'express';

// Assumes req.user is set by authMiddleware and has an isAdmin property
const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Admin access required' });
};

export default adminMiddleware;
