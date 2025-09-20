import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/index.js';

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  tokens: {
    type: Number,
    required: true,
    default: 100,
    set: (val: number) => (Math.round(val * 10) / 10).toFixed(1),
  },
});

const User = mongoose.model('User', userSchema);

export default User;
