import { NotFound, ServerError } from '../../../errors';
import { prisma } from '../../../db';

export const createComment = async (
    userId: string,
    postId: string,
    content: string
) => {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFound(['Parent post not found']);

    const comment = await prisma.comment.create({
        data: {
            userId,
            postId,
            content,
        },
    });

    if (!comment) throw new ServerError();
    return comment;
};

export const createChildComment = async (
    userId: string,
    commentId: string,
    content: string
) => {
    const comment = await prisma.comment.create({
        data: {
            userId,
            subCommentId: commentId,
            content,
        },
    });

    if (!comment) throw new ServerError();
    return comment;
};

export const commentById = async (commentId: string) => {
    const comment = await prisma.comment.findUnique({
        where: { id: commentId },
        include: {
            comments: {
                include: {
                    comments: {
                        include: { comments: { include: { comments: true } } },
                    },
                },
            },
        },
    });
    return comment;
};
