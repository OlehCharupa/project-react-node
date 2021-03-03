import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import path from "path";
import mongoose from "mongoose";
import { getPaths } from "./helpers/utils.js";
import morgan from "morgan"

export class Server {
    constructor() {
        this.server = null;
    }

    async start() {
        this.initServer();
        this.initConfig();
        await this.initDatabase();
        this.initMiddlewares();
        this.initRoutes();
        this.initErrorHandling();
        this.startListening();
    }

    initServer() {
        this.server = express();
    }

    initConfig() {
        const { __dirname } = getPaths(import.meta.url);
        dotenv.config({ path: path.join(__dirname, "../.env") });
    }

    async initDatabase() {
        try {
            const { MONGODB_URL } = process.env;
            await mongoose.connect(MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            });
            console.log("Database connection successful");
        } catch (arror) {
            console.log(error);
            process.exit(1);
        }
    }

    initMiddlewares() {
        this.server.use(express.json());
        this.server.use(cors())
        this.server.use(morgan("dev"))
    }

    initRoutes() {
    }

    initErrorHandling() {
        this.server.use((err, req, res, next) => {
            const statusCode = err.status || 500;
            console.log(err);
            res.status(statusCode).send(err.message);
        });
    }

    startListening() {
        const { PORT } = process.env;
        this.server.listen(PORT, () => {
            console.log("Server started listening on port", PORT);
        });
    }
}