import express from "express";
import authenticateJWT from "./../../helpers/jwt.js";

import { createProject } from "./../controllers/projectController.js";
let router = express.Router();
// POST routes
router.post("/create", authenticateJWT, createProject);
export default router;
