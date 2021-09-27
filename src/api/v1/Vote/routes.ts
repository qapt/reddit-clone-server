import express from 'express';
import { isAuth } from '../../../middleware/isAuth';
import {
    getPostVotes,
    upvotePost,
    downvotePost,
    downvotedPosts,
    upvotedPosts,
} from './controller';

// :5000/votes
const router = express.Router();

router.get('/:postId', getPostVotes);
router.post('/upvotes/:postId', isAuth, upvotePost);
router.post('/downvotes/:postId', isAuth, downvotePost);

router.get('/upvotes/all', isAuth, upvotedPosts);
router.get('/downvotes/all', isAuth, downvotedPosts);

export default router;
