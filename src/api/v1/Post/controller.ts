import { NextFunction, Request, Response } from 'express';
import * as PostService from './service';
import { AUTH_TOKEN } from '../../../utils/constants';
import { InvalidInput } from '../../../errors';

export const createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.signedCookies[AUTH_TOKEN];
    const { title, content, tags, subredditName } = req.body;
    if (!title || !content || !subredditName) {
        return next(new InvalidInput(['Please provide a title and content']));
    }
    const newPost: NewPostInput = {
        userId,
        title,
        content,
        tags,
        subredditName,
    };

    try {
        const createdPost = await PostService.createPost(newPost);

        res.status(201).json({
            post: createdPost,
        });
    } catch (error) {
        next(error);
    }
};

export const fetchAllPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const posts = await PostService.allPosts();

        res.json({
            posts,
        });
    } catch (error) {
        next(error);
    }
};

export const fetchPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { postId } = req.params;
    try {
        const post = await PostService.postById(postId);

        res.json({ post });
    } catch (error) {
        next(error);
    }
};

export const fetchPostsBySubreddit = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { subredditName } = req.params;
    try {
        const posts = await PostService.postsBySubreddit(subredditName);
        res.json({
            posts,
        });
    } catch (error) {
        next(error);
    }
};

export const createSavedPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.signedCookies[AUTH_TOKEN];
    const { postId } = req.params;
    try {
        const savedPost = await PostService.savePost(postId, userId);

        res.status(201).json({
            post: savedPost,
        });
    } catch (error) {
        next(error);
    }
};

export const getSavedPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.signedCookies[AUTH_TOKEN];
    try {
        const savedPosts = await PostService.savedPosts(userId);
        res.json({ posts: savedPosts });
    } catch (error) {
        next(error);
    }
};
