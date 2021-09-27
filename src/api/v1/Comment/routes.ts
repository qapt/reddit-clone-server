import express from 'express';
import { isAuth } from '../../../middleware/isAuth';
import {
    createChildComment,
    createComment,
    fetchCommentById,
} from './controller';
const router = express.Router();

router.get('/:commentId', fetchCommentById);
router.post('/:postId', isAuth, createComment);
router.post('/children/:commentId', isAuth, createChildComment);

export default router;
