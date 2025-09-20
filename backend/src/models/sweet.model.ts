import mongoose, { Schema, model, Document } from 'mongoose';
import { ISweet } from '../types/index.js';

const sweetSchema = new Schema<ISweet>(
  {
    name: { type: String, required: true, unique: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Mithai',
        'Bengali',
        'Dry Fruit',
        'Halwa',
        'Milk Based',
        'Fried',
        'Chhena',
        'Fusion',
        'Other',
      ],
    },
    description: {
      type: String,
      required: true,
      default: 'Add sweetness to your memories and savor each and every moment.',
    },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    imageUrl: { type: String },
    imagePublicId: { type: String },
    
  },
  { timestamps: true },
);

export default model<ISweet>('Sweet', sweetSchema);
