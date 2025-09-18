import { Request } from "express";
import { Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface ISweet extends Document {
  name: string;
  category: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  imagePublicId?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      accessToken?: string;
    }
  }
}

export interface MulterRequest extends Request {
  file?: {
    path: string;
  };
}
