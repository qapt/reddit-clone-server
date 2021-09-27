import { prisma } from '../../../db';
import { validateCredentials } from './utils/validateCredentials';
import { hashPassword } from './utils/hashPassword';
import { BadRequest, Unauthorized } from '../../../errors/index';

export const findUserById = async (userId: string) => {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, username: true, email: true },
    });
};
// 409-Conflict might be a better http status code
export const checkIfUserExists = async (username: string, email: string) => {
    const usernameExists = await prisma.user.findUnique({
        where: { username },
    });
    if (usernameExists) throw new BadRequest(['Username already taken']);
    const emailExists = await prisma.user.findUnique({
        where: { email },
    });
    if (emailExists) throw new BadRequest(['Email already taken']);
};

export const createUser = async ({
    name,
    username,
    email,
    password,
}: UserRegisterInput) => {
    await checkIfUserExists(username, email);
    const hashedPassword = await hashPassword(password);
    return await prisma.user.create({
        data: { name, username, email, password: hashedPassword },
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
        },
    });
};

export const loginUser = async (username: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { username },
    });
    if (!user) throw new Unauthorized(['Invalid credentials']);

    const isValidPassword = await validateCredentials(password, user.password);
    if (!isValidPassword) throw new Unauthorized(['Invalid credentials']);

    return user;
};
