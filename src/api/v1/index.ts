import express from 'express';

import authRoutes from './Auth/routes';
import subredditRoutes from './Subreddit/routes';
import postRoutes from './Post/routes';
import voteRoutes from './Vote/routes';
import commentRoutes from './Comment/routes';

const router = express.Router();

router.use('/accounts', authRoutes);
router.use('/subreddits', subredditRoutes);
router.use('/posts', postRoutes);
router.use('/votes', voteRoutes);
router.use('/comments', commentRoutes);

export default router;
