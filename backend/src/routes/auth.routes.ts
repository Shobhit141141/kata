import { Router, Request, Response } from 'express';
import { checkUsername, login, logout, register } from '../controllers/auth.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyToken, logout);
router.post('/check-username', checkUsername);
router.get('/me', verifyToken, (req: Request, res: Response) => {
  res.json(req.user);
});

export default router;
