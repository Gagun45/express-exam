import express from "express";

import { config } from "./configs/config";
import { dbConnection } from "./db/db-connect";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const start = async () => {
    try {
        await dbConnection();
        app.listen(config.PORT, () => {
            console.log(`Server running on ${config.PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
