import dotenv from "dotenv";

dotenv.config();

interface IConfig {
    PORT: string;
    MONGO_URI: string;
}

export const config: IConfig = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
};
