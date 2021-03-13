import cors from "cors";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import { getPaths } from "./helpers/utils.js"
import dotenv from "dotenv"
import authRouter from "./auth/auth.routes.js";
import projectRouter from "./endpoints/project/project.routes.js";
import sprintRouter from "./endpoints/sprint/sprint.routes.js";
import taskRouter from "./endpoints/task/task.router.js";
// import swagger
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.js";


export default class Server {
    constructor() {
        this.server = null;
    }

    async start() {
        this.initServer()
        this.initMiddlewares();
        this.initConfig()
        this.initRoutes();
        await this.initDataBase();
        this.initErrorHandling();
        this.initListening();
    }
    initServer() {
        this.server = express()
    }
    initConfig() {
        const { __dirname } = getPaths(import.meta.url);
        dotenv.config({ path: path.join(__dirname, "../.env") });
    }

    initMiddlewares() {
        this.server.use(express.json());
        this.server.use(cors());
    }

    async initDataBase() {
        try {
            await mongoose.connect(process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            });
            console.log("Database connection is successful");
        } catch (error) {
            console.log("Database connection failed", error);
            process.exit(1);
        }
    }

    initRoutes() {
        this.server.use("/auth", authRouter);
        this.server.use("/project", projectRouter);
        this.server.use("/sprint", sprintRouter);
        this.server.use("/task", taskRouter);
        this.server.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(swaggerDocument)
        );
    }

    initErrorHandling() {
        this.server.use(
            (err, req, res, next) => {
                let statusCode = err.status || 500;
                console.log(err);
                return res.status(statusCode).send(err.message);
            }
        );
    }

    initListening() {
        this.server.listen(process.env.PORT || 5000, () =>
            console.log("Started listening on port", process.env.PORT)
        );
    }
}
