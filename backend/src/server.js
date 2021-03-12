import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import morgan from "morgan";
import { getPaths } from "./helpers/utils.js";
//import routes
import routerUser from "./app/routes/routeUser.js";
import routerProject from "./app/routes/routerProject.js";
import routerSprint from "./app/routes/routerSprint.js";
import routerTask from "./app/routes/routerTask.js";
// import swagger
// import swaggerUi from "swagger-ui-express";
// const swaggerDoc = require("../swagger.json");
export class Server {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initConfig();
    this.initRoutes();
    await this.initDatabase();
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
        useCreateIndex: true,
      });
      console.log("Database connection successful");
    } catch (arror) {
      console.log(error);
      process.exit(1);
    }
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(morgan("dev"));
    this.server.use(bodyParser.json());
    this.server.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
  }

  initRoutes() {
    // routers user // reg// login// logout
    this.server.use("/api/users/", routerUser);
    // router project
    this.server.use("/api/projects/", routerProject);
    // router sprint
    this.server.use("/api/sprints/", routerSprint);
    // router task
    this.server.use("/api/tasks/", routerTask);
    // swagger
    // this.server.use(
    //   "/api-docs",
    //   swaggerUi.serve,
    //   swaggerUi.setup(swaggerDoc)
    // );
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
