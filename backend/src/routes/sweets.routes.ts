import { Router } from 'express';
import {
  addSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
} from '../controllers/sweets.controller.js';
import adminMiddleware from '../middlewares/admin.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = Router();

router.post('/', verifyToken, addSweet);
router.get('/', verifyToken, getSweets);
router.get('/search', verifyToken, searchSweets);
router.put('/:id', verifyToken, updateSweet);
router.delete('/:id', verifyToken, adminMiddleware, deleteSweet);

export default router;
