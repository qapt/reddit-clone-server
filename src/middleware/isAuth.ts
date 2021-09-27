import { NextFunction, Request, Response } from 'express';
import { AUTH_TOKEN } from './../utils/constants';
import { Unauthorized } from './../errors';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.signedCookies[AUTH_TOKEN]) {
        next(new Unauthorized(['Please authenticate.']));
    }
    next();
};
