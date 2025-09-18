import { Request, Response } from 'express';
import Sweet from '../models/sweet.model.js';
import { uploadImage, deleteImage, updateImage } from '../utils/cloudinary.js';
import { MulterRequest } from '../types/index.js';
import logger from '../utils/logger.js';

export const addSweet = async (req: MulterRequest, res: Response) => {
  try {
    const { name, category, price, quantity } = req.body;
    let imageUrl, imagePublicId;
    if (req.file?.path) {
      const result = await uploadImage(req.file.path, name);
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }
    const sweet = await Sweet.create({ name, category, price, quantity, imageUrl, imagePublicId });
    res.status(201).json({ success: true, sweet });
  } catch (err) {
    logger.error('Error adding sweet:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ success: false, message });
  }
};

export const getSweets = async (_req: Request, res: Response) => {
  try {
    const sweets = await Sweet.find();
    res.json({ success: true, sweets });
  } catch (err) {
    logger.error('Error fetching sweets:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ success: false, message });
  }
};

export const searchSweets = async (req: Request, res: Response) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const query: any = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (category) query.category = category;
    if (minPrice || maxPrice) query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
    const sweets = await Sweet.find(query);
    res.json({ success: true, sweets });
  } catch (err) {
    logger.error('Error searching sweets:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ success: false, message });
  }
};

export const updateSweet = async (req: MulterRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category, price, quantity } = req.body;
    let sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ success: false, message: 'Sweet not found' });
    let imageUrl, imagePublicId;
    if (req.file?.path) {
      const result = await uploadImage(req.file.path, name);
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
      sweet.imageUrl = imageUrl;
      sweet.imagePublicId = imagePublicId;
    }
    sweet.name = name || sweet.name;
    sweet.category = category || sweet.category;
    sweet.price = price || sweet.price;
    sweet.quantity = quantity || sweet.quantity;
    await sweet.save();
    res.json({ success: true, sweet });
  } catch (err) {
    logger.error('Error updating sweet:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ success: false, message });
  }
};

export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ success: false, message: 'Sweet not found' });
    if (sweet.imagePublicId) await deleteImage(sweet.imagePublicId);
    await sweet.deleteOne();
    res.json({ success: true, message: 'Sweet deleted' });
  } catch (err) {
    logger.error('Error deleting sweet:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ success: false, message });
  }
};
