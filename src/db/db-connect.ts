import mongoose from "mongoose";

import { config } from "../configs/config";

export const dbConnection = async () => {
    let dbCon = false;
    while (!dbCon) {
        try {
            console.log("Connecting to DB...");
            await mongoose.connect(config.MONGO_URI);
            dbCon = true;
            console.log("Connected to DB!");
        } catch (e) {
            console.log(e);
            console.log(
                "Database unavailable, trying to reconnect in 3 seconds...",
            );
            await new Promise((res) => setTimeout(res, 3000));
        }
    }
};
