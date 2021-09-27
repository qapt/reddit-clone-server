import express from 'express';
import { isAuth } from '../../../middleware/isAuth';
import {
    createPost,
    createSavedPost,
    fetchAllPosts,
    fetchPostById,
    fetchPostsBySubreddit,
    getSavedPosts,
} from './controller';
const router = express.Router();

router.post('/', isAuth, createPost);
router.get('/', fetchAllPosts);
router.get('/:postId', fetchPostById);
router.get('/subreddit/:subredditName', fetchPostsBySubreddit);

router.post('/save/:postId', isAuth, createSavedPost);
router.get('/save/all', isAuth, getSavedPosts);

export default router;
