import { NextFunction, Request, Response } from 'express';
import { AUTH_TOKEN } from '../../../utils/constants';
import * as SubredditService from './service';

export const getAllSubreddits = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const subreddits = await SubredditService.allSubreddits();
        res.json(subreddits);
    } catch (error) {
        next(error);
    }
};

export const getSubredditByName = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { subredditName } = req.params;

    try {
        const subreddit = await SubredditService.subredditByName(subredditName);
        res.json(subreddit);
    } catch (error) {
        next(error);
    }
};

export const createSubreddit = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, title, color } = req.body;
    const subredditToBeAdded: NewSubredditInput = {
        name,
        title,
        color,
    };
    try {
        const newSubreddit = await SubredditService.createSubreddit(
            subredditToBeAdded
        );
        res.status(201).json({ subreddit: newSubreddit });
    } catch (error) {
        next(error);
    }
};

export const subscribeToSubreddit = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.signedCookies[AUTH_TOKEN];
    const { subredditId } = req.params;
    try {
        const subscription = await SubredditService.createSubscription(
            userId,
            subredditId
        );
        res.status(201).json({
            subscription,
        });
    } catch (error) {
        next(error);
    }
};

export const getSubscribedSubreddits = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.signedCookies[AUTH_TOKEN];

    try {
        const subscriptions = await SubredditService.allSubscriptions(userId);
        res.json({ subscriptions });
    } catch (error) {
        next(error);
    }
};

export const subscribedIds = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.signedCookies[AUTH_TOKEN];
    try {
        const subscribedIds = await SubredditService.subscribedIds(userId);
        res.json({
            subscribedIds,
        });
    } catch (error) {
        next(error);
    }
};
