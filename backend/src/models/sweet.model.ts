import { Schema, model, Document } from 'mongoose';
import { ISweet } from '../types/index.js';

const sweetSchema = new Schema<ISweet>(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    imageUrl: { type: String },
    imagePublicId: { type: String },
  },
  { timestamps: true },
);

export default model<ISweet>('Sweet', sweetSchema);
