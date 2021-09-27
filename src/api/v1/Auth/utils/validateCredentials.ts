import bcrypt from 'bcryptjs';

export const validateCredentials = async (
    password: string,
    existingPassword: string
) => {
    return await bcrypt.compare(password, existingPassword);
};
