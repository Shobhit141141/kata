import { Request, Response } from 'express';
import Sweet from '../models/sweet.model.js';
import { uploadImage, deleteImage, updateImage } from '../utils/cloudinary.js';
import { MulterRequest } from '../types/index.js';
import logger from '../utils/logger.js';
import mongoose from 'mongoose';
import { getGeminiResponse } from '../services/gemini.js';

/**
 * Adds a new sweet to the database.
 * Ensures required fields are provided and the name is unique.
 * Optionally uploads an image to cloud storage.
 * Responds with the created sweet on success.
 */
export const addSweet = async (req: MulterRequest, res: Response) => {
  try {
    const { name, description, category, price, quantity } = req.body;
    if (!name || !description || !category || !price || !quantity) {
      return res.status(400).json({ success: false, message: 'Some fields are missing' });
    }
    const existingSweet = await Sweet.findOne({ name });
    if (existingSweet) {
      return res.status(409).json({ success: false, message: 'Sweet name must be unique' });
    }

    let imageUrl, imagePublicId;

    if (req.file) {
      const result = (await uploadImage(req.file, name)) as {
        secure_url: string;
        public_id: string;
      };
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    const sweet = await Sweet.create({
      name,
      description,
      category,
      price,
      quantity,
      imageUrl,
      imagePublicId,
    });
    res.status(201).json({ success: true, sweet });
  } catch (err) {
    logger.error('Error adding sweet:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ success: false, message });
  }
};

/** Retrieves all sweets from the database.
 * Responds with a list of sweets.
 */
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

/**
 * Retrieves a sweet by its ID.
 * Responds with the sweet if found, otherwise returns an error.
 */
export const getSweetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Sweet ID is required' });
    }
    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ success: false, message: 'Sweet not found' });
    }
    res.json({ success: true, sweet });
  } catch (err) {
    logger.error('Error fetching sweet by ID:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ success: false, message });
  }
};

/**
 * Fetches a fun fact about a specific sweet using an AI service.
 * Responds with the fun fact or an error message.
 */
export const getFunFact = async (req: Request, res: Response) => {
  try {
    const { sweetName } = req.params;
    if (!sweetName) {
      return res.status(400).json({ success: false, message: 'Sweet name is required' });
    }

    const funFact = await getGeminiResponse([
      {
        role: 'system',
        content:
          'You are a fun and engaging assistant that provides interesting facts about sweets.Just return fact without any explanation. Always return new fact in one sentence.',
      },
      { role: 'user', content: `Tell me a fun fact about the sweet: ${sweetName}.` },
    ]);

    res.json({ success: true, funFact });
  } catch (err) {
    logger.error('Error fetching fun fact:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ success: false, message });
  }
};

/** 
 * Retrieves recommended sweets, optionally excluding a specific sweet by ID.
 * Responds with a list of recommended sweets sorted by quantity.
 */
export const getRecommendedSweets = async (req: Request, res: Response) => {
  try {
    const { exceptSweetId } = req.query;

    let filter = {};
    if (exceptSweetId && mongoose.Types.ObjectId.isValid(String(exceptSweetId))) {
      filter = { _id: { $ne: new mongoose.Types.ObjectId(String(exceptSweetId)) } };
    }

    const sweets = await Sweet.find(filter).sort({ quantity: -1 }).limit(5);
    res.json({ success: true, sweets });
  } catch (err) {
    logger.error('Error fetching recommended sweets:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ success: false, message });
  }
};

/**
 * Searches for sweets based on various criteria.
 * Responds with the search results or an error message.
 */
export const searchSweets = async (req: Request, res: Response) => {
  try {
    const { name, description, category, minPrice, maxPrice } = req.query;
    const query: any = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (description) query.description = { $regex: description, $options: 'i' };
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

/**
 * Updates an existing sweet's details.
 * Handles optional image updates.
 */
export const updateSweet = async (req: MulterRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, category, price, quantity } = req.body;
    let sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ success: false, message: 'Sweet not found' });
    let imageUrl, imagePublicId;
    if (req.file) {
      const result = (await updateImage(sweet.imagePublicId ?? '', req.file, name)) as {
        secure_url: string;
        public_id: string;
      };
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
      sweet.imageUrl = imageUrl;
      sweet.imagePublicId = imagePublicId;
    }
    sweet.name = name || sweet.name;
    sweet.category = category || sweet.category;
    sweet.price = price || sweet.price;
    sweet.quantity = quantity || sweet.quantity;
    sweet.description = description || sweet.description;
    await sweet.save();
    res.json({ success: true, sweet });
  } catch (err) {
    logger.error('Error updating sweet:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ success: false, message });
  }
};

/**
 * Deletes a sweet from the database.
 * Handles image deletion from cloud storage if applicable.
 */
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
