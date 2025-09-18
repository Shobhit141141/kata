import { Router } from 'express';
import { purchaseSweet, restockSweet } from '../controllers/inventory.controller.js';
import verifyToken from '../middlewares/verifyToken.js';
import adminMiddleware from '../middlewares/admin.js';

const router = Router();

router.post('/:id/purchase', verifyToken, purchaseSweet);
router.post('/:id/restock', verifyToken, adminMiddleware, restockSweet);

export default router;
