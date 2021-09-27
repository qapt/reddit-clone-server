import { prisma } from '../../../db';
import { ServerError, BadRequest, NotFound } from '../../../errors';

export const allSubreddits = async () => {
    const subreddits = await prisma.subreddit.findMany({
        select: { id: true, name: true },
    });
    if (!subreddits) throw new ServerError();
    return subreddits;
};

export const subredditByName = async (name: string) => {
    const subreddit = await prisma.subreddit.findFirst({
        where: { name },
    });
    if (!subreddit) throw new NotFound(['Subreddit not found']);
    return subreddit;
};

export const createSubreddit = async ({
    name,
    title,
    color,
}: NewSubredditInput) => {
    const existingSubreddit = await prisma.subreddit.findFirst({
        where: { name },
    });
    if (existingSubreddit) throw new BadRequest(['Subreddit already exists.']);

    const createdSubreddit = await prisma.subreddit.create({
        data: {
            name,
            title,
            color,
        },
    });
    if (!createdSubreddit) throw new ServerError();
    return createdSubreddit;
};

export const createSubscription = async (
    userId: string,
    subredditId: string
) => {
    const alreadySubscribed = await prisma.subscription.findFirst({
        where: {
            subredditId,
            userId,
        },
    });

    if (alreadySubscribed) {
        const unsubscribeData = await prisma.subscription.delete({
            where: {
                id: alreadySubscribed.id,
            },
        });
        return unsubscribeData;
    } else {
        const subscribeData = await prisma.subscription.create({
            data: {
                userId,
                subredditId,
            },
        });
        return subscribeData;
    }
};

export const allSubscriptions = async (userId: string) => {
    return await prisma.subscription.findMany({
        where: { userId },
        select: {
            id: false,
            userId: false,
            subredditId: false,
            createdAt: true,
            subreddit: {
                select: {
                    id: true,
                    name: true,
                    color: true,
                },
            },
        },
    });
};

export const subscribedIds = async (userId: any) => {
    return await prisma.subscription.findMany({
        where: { userId },
        select: {
            subredditId: true,
        },
    });
};
