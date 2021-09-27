import { NextFunction, Request, Response } from 'express';
import { AUTH_TOKEN } from '../../../utils/constants';
import { InvalidInput } from '../../../errors';
import * as CommentService from './service';

export const fetchCommentById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { commentId } = req.params;

    try {
        const comment = await CommentService.commentById(commentId);

        res.json({ comment });
    } catch (error) {
        next(error);
    }
};

export const createComment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.signedCookies[AUTH_TOKEN];
    const { content } = req.body;
    const { postId } = req.params;
    if (!content || !postId) {
        return next(new InvalidInput(['Some comment data is missing.']));
    }

    try {
        const createdComment = await CommentService.createComment(
            userId,
            postId,
            content
        );

        res.status(201).json({
            comment: createdComment,
        });
    } catch (error) {
        next(error);
    }
};

export const createChildComment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = req.signedCookies[AUTH_TOKEN];
    const { content } = req.body;
    const { commentId } = req.params;
    if (!content || !commentId) {
        return next(new InvalidInput(['Some comment data is missing.']));
    }

    try {
        const createdComment = await CommentService.createChildComment(
            userId,
            commentId,
            content
        );

        res.status(201).json({
            comment: createdComment,
        });
    } catch (error) {
        next(error);
    }
};
