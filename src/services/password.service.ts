import bcrypt from "bcrypt";

export const passwordService = {
    hash: (password: string): Promise<string> => bcrypt.hash(password, 10),
    compare: (password: string, hash: string): Promise<boolean> =>
        bcrypt.compare(password, hash),
};
