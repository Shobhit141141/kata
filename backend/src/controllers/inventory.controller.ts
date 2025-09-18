import { Request, Response } from 'express';
import Sweet from '../models/sweet.model.js';

export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ success: false, message: 'Sweet not found' });
    if (sweet.quantity < 1)
      return res.status(400).json({ success: false, message: 'Out of stock' });
    sweet.quantity -= 1;
    await sweet.save();
    res.json({ success: true, sweet });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ success: false, message });
  }
};

export const restockSweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ success: false, message: 'Sweet not found' });
    sweet.quantity += Number(amount) || 1;
    await sweet.save();
    res.json({ success: true, sweet });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ success: false, message });
  }
};
