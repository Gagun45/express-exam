import bcrypt from "bcrypt";

export const passwordService = {
    hash: async (password: string): Promise<string> => {
        return bcrypt.hash(password, 10);
    },
    compare: async (password: string, hash: string): Promise<boolean> => {
        return bcrypt.compare(password, hash);
    },
};
