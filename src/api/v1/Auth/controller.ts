import { InvalidInput } from './../../../errors/index';
import { AUTH_TOKEN } from '../../../utils/constants';
import { Request, Response, NextFunction } from 'express';
import * as UserService from './service';
import { clearAuthCookie, createAuthCookie } from './utils/authCookie';

// TODO: not return password with user data
// TODO: forgot password / change password

export const currentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authToken = req.signedCookies[AUTH_TOKEN];
    if (!authToken) {
        return res.json({ isLoggedIn: false });
    } else {
        const user = await UserService.findUserById(authToken);
        return res.json({ user, isLoggedIn: true });
    }
};

export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, username, email, password } = req.body;
    let errors: string[] = [];

    if (!name) errors.push('Name is required');
    if (!username) errors.push('Username is required');
    if (!email) errors.push('Email is required');
    if (!password) errors.push('Password is required');

    if (errors.length !== 0) {
        return next(new InvalidInput(errors));
    }

    const newUser: UserRegisterInput = {
        name,
        username,
        email,
        password,
    };
    try {
        const createdUser = await UserService.createUser(newUser);
        createAuthCookie(res, createdUser.id);

        res.status(201).json({
            message: 'User registered successfully',
            user: createdUser,
        });
    } catch (error) {
        next(error);
    }
};

// TODO: allow login with email
export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username, password } = req.body;
    let errors: string[] = [];

    if (!username) errors.push('Username is required');
    if (!password) errors.push('Password is required');

    if (errors.length !== 0) {
        return next(new InvalidInput(errors));
    }

    try {
        const user = await UserService.loginUser(username, password);

        createAuthCookie(res, user.id);
        res.json({
            message: 'Logged in successfully',
            user: {
                username: user.username,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const logoutUser = (req: Request, res: Response) => {
    clearAuthCookie(res);
    res.json({ message: 'Logged out successfully' });
};
