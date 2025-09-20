import { Request, Response } from "express";
import Sweet from "../models/sweet.model.js";
import User from "../models/user.model.js";
import logger from "../utils/logger.js";

export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const amount = Number(req.body.amount) ;
    if (isNaN(amount) || amount < 1) {
      return res.status(400).json({ success: false, message: "Invalid quantity" });
    }
    const qty = Math.max(1, amount);

    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ success: false, message: "Sweet not found" });
    }

    if (sweet.quantity < qty) {
      return res.status(400).json({ success: false, message: "Not enough stock" });
    }

    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const totalPrice = qty * sweet.price;
    const tokensToDeduct = Math.ceil(totalPrice / 100);

    if (user.tokens < tokensToDeduct) {
      return res.status(400).json({ success: false, message: "Not enough tokens" });
    }

    user.tokens -= tokensToDeduct;
    await user.save();

    sweet.quantity -= qty;
    await sweet.save();

    res.status(200).json({
      success: true,
      sweet,
      purchased: {
        quantity: qty,
        totalPrice,
        tokensDeducted: tokensToDeduct,
        remainingTokens: user.tokens,
      },
    });
  } catch (err) {
    logger.error("Purchase error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ success: false, message });
  }
};

export const restockSweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const amount = Number(req.body.amount) || 1;

    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ success: false, message: "Sweet not found" });
    }

    sweet.quantity += amount;
    await sweet.save();

    res.status(200).json({ success: true, sweet });
  } catch (err) {
    logger.error("Restock error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ success: false, message });
  }
};
