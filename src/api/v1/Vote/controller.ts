import { NextFunction, Request, Response } from 'express';
import * as VoteService from './service';
import { AUTH_TOKEN } from '../../../utils/constants';

export const getPostVotes = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { postId } = req.params;
    try {
        const votes = await VoteService.postVotes(postId);
        res.json({
            votes,
        });
    } catch (error) {
        next(error);
    }
};

export const upvotePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.signedCookies[AUTH_TOKEN];
    const { postId } = req.params;
    try {
        const upvote = await VoteService.upvotePost(userId, postId);
        res.json({
            upvote,
        });
    } catch (error) {
        next(error);
    }
};

export const downvotePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.signedCookies[AUTH_TOKEN];
    const { postId } = req.params;
    try {
        const downvote = await VoteService.downvotePost(userId, postId);
        res.json({
            downvote,
        });
    } catch (error) {
        next(error);
    }
};

export const upvotedPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.signedCookies[AUTH_TOKEN];
    try {
        const posts = await VoteService.upvotedPosts(userId);
        res.json({
            posts,
        });
    } catch (error) {
        next(error);
    }
};

export const downvotedPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.signedCookies[AUTH_TOKEN];
    try {
        const posts = await VoteService.downvotedPosts(userId);
        res.json({
            posts,
        });
    } catch (error) {
        next(error);
    }
};
