import express from 'express';
import { isAuth } from '../../../middleware/isAuth';
import {
    createSubreddit,
    getAllSubreddits,
    getSubredditByName,
    getSubscribedSubreddits,
    subscribedIds,
    subscribeToSubreddit,
} from './controller';
const router = express.Router();

router.get('/:subredditName', getSubredditByName);
router.get('/', getAllSubreddits);
router.post('/', createSubreddit);

router.post('/:subredditId/subscriptions', isAuth, subscribeToSubreddit);
router.get('/:subredditId/subscriptions', isAuth, subscribedIds);
router.get('/feed/subscriptions/all', isAuth, getSubscribedSubreddits);

export default router;
