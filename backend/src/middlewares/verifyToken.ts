import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';
import { Request, Response, NextFunction } from 'express';
import { CONSTANTS } from '../config/constants.js';
import { IUser } from '../types/index.js';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, CONSTANTS.JWT_SECRET);
    if (typeof decoded === 'object' && decoded !== null) {
      req.user = decoded as IUser;
      req.isAdmin = req.user.role === 'admin';
      next();
    } else {
      return res.status(401).json({ message: 'Token is not valid' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default verifyToken;
