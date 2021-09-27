import { Response } from 'express';
import { AUTH_TOKEN } from '../../../../utils/constants';

export const createAuthCookie = (res: Response, userId: string) => {
    res.cookie(AUTH_TOKEN, userId, {
        signed: true,
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax',
        // secure: __prod__
    });
};

export const clearAuthCookie = (res: Response) => {
    res.clearCookie(AUTH_TOKEN);
};
