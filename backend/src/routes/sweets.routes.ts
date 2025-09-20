import { Router } from 'express';
import {
  addSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  getSweetById,
  getRecommendedSweets,
  getFunFact,
} from '../controllers/sweets.controller.js';
import adminMiddleware from '../middlewares/admin.js';
import verifyToken from '../middlewares/verifyToken.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.post('/', verifyToken, upload.single('file'), addSweet);
router.get('/', verifyToken, getSweets);
router.get('/recommended', verifyToken, getRecommendedSweets);
router.get('/search', verifyToken, searchSweets);
router.get('/funfact/:sweetName', verifyToken, getFunFact);
router.put('/:id', verifyToken, upload.single('file'), updateSweet);
router.get('/:id', verifyToken, getSweetById);
router.delete('/:id', verifyToken, adminMiddleware, deleteSweet);

export default router;
