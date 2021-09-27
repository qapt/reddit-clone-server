import { ServerError } from '../../../errors';
import { prisma } from '../../../db';

export const upvotePost = async (userId: string, postId: string) => {
    const alreadyUpvoted = await prisma.upvote.findUnique({
        where: {
            userId_postId: { userId, postId },
        },
    });
    if (alreadyUpvoted) {
        return await prisma.upvote.delete({
            where: { userId_postId: { userId, postId } },
        });
    }

    const downvoted = await prisma.downvote.findUnique({
        where: {
            userId_postId: { userId, postId },
        },
    });

    if (downvoted) {
        await prisma.downvote.delete({
            where: { userId_postId: { userId, postId } },
        });
    }

    const upvote = await prisma.upvote.create({
        data: {
            userId,
            postId,
        },
    });
    if (!upvote) throw new ServerError();

    return upvote;
};

export const downvotePost = async (userId: string, postId: string) => {
    const alreadyDownvoted = await prisma.downvote.findUnique({
        where: {
            userId_postId: { userId, postId },
        },
    });
    if (alreadyDownvoted) {
        return await prisma.downvote.delete({
            where: { userId_postId: { userId, postId } },
        });
    }

    const upvoted = await prisma.upvote.findUnique({
        where: {
            userId_postId: { userId, postId },
        },
    });

    if (upvoted) {
        await prisma.upvote.delete({
            where: { userId_postId: { userId, postId } },
        });
    }

    const downvote = await prisma.downvote.create({
        data: {
            userId,
            postId,
        },
    });
    if (!downvote) throw new ServerError();

    return downvote;
};

export const postVotes = async (postId: string) => {
    const upvotes = await prisma.upvote.count({
        where: { postId },
    });
    const downvotes = await prisma.downvote.count({
        where: {
            postId,
        },
    });
    return upvotes - downvotes;
};

export const upvotedPosts = async (userId: string) => {
    const posts = await prisma.upvote.findMany({
        where: { userId },
        select: { postId: true },
    });
    if (!posts) throw new ServerError();
    return posts;
};

export const downvotedPosts = async (userId: string) => {
    const posts = await prisma.downvote.findMany({
        where: { userId },
        select: { postId: true },
    });
    if (!posts) throw new ServerError();
    return posts;
};
