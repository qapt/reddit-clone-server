import { prisma } from '../../../db';
import { NotFound, ServerError } from '../../../errors';

export const createPost = async ({
    userId,
    title,
    content,
    tags,
    subredditName,
}: NewPostInput) => {
    const subreddit = await prisma.subreddit.findFirst({
        where: {
            name: subredditName,
        },
    });
    if (!subreddit) {
        throw new NotFound(['Subreddit with that name not found']);
    }

    const createdPost = await prisma.post.create({
        data: {
            userId,
            subredditId: subreddit.id,
            title,
            content,
            tags,
        },
    });

    if (!createdPost) {
        throw new ServerError();
    }
    return createdPost;
};

export const allPosts = async () => {
    return await prisma.post.findMany({
        include: {
            user: {
                select: {
                    username: true,
                },
            },
            subreddit: {
                select: {
                    name: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};

export const postById = async (postId: string) => {
    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
        select: {
            id: true,
            title: true,
            content: true,
            tags: true,
            comments: {
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    comments: {
                        select: {
                            id: true,
                            content: true,
                            createdAt: true,
                            comments: {
                                select: {
                                    id: true,
                                    content: true,
                                    createdAt: true,
                                },
                            },
                        },
                    },
                },
            },
            user: {
                select: {
                    username: true,
                },
            },
            subreddit: {
                select: {
                    name: true,
                },
            },
        },
    });
    if (!post) throw new NotFound(['Post with that id not found']);
    return post;
};

export const postsBySubreddit = async (subredditName: string) => {
    const subreddit = await prisma.subreddit.findFirst({
        where: {
            name: subredditName,
        },
        select: {
            id: true,
        },
    });

    if (!subreddit) throw new NotFound(['Subreddit with that name not found']);

    const posts = await prisma.post.findMany({
        where: {
            subredditId: subreddit.id,
        },
        select: {
            id: true,
            title: true,
            content: true,
            tags: true,
            user: {
                select: {
                    username: true,
                },
            },
            subreddit: {
                select: {
                    name: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    if (!posts) throw new ServerError();

    return posts;
};

export const savePost = async (postId: string, userId: string) => {
    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
    });
    if (!post) throw new NotFound(['Post not found']);

    const alreadySaved = await prisma.savedPost.findUnique({
        where: {
            userId_postId: { userId, postId },
        },
    });

    if (alreadySaved) {
        // if post is already saved
        // unsave it
        const unsavedPost = await prisma.savedPost.delete({
            where: {
                userId_postId: { userId, postId },
            },
        });
        return unsavedPost;
    } else {
        // save it
        const savedPost = await prisma.savedPost.create({
            data: {
                postId,
                userId,
            },
        });
        return savedPost;
    }
};

export const savedPosts = async (userId: string) => {
    const savedPosts = await prisma.savedPost.findMany({
        where: { userId },
        select: {
            postId: true,
        },
    });

    if (!savedPosts) throw new ServerError();
    return savedPosts;
};
