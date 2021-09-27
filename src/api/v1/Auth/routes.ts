import express from 'express';
import { currentUser, registerUser, loginUser, logoutUser } from './controller';

const router = express.Router();

router.get('/', currentUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;
