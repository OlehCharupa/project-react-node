import express from "express";
import authenticateJWT from "./../../helpers/jwt.js";

import {
  createProject,
  deleteProject,
} from "./../controllers/projectController.js";
let router = express.Router();
// POST routes
// data to proj -> title, description
// везде string там где другой тип, там будет написано.

router.post("/create", authenticateJWT, createProject);
router.delete("/:projectId", authenticateJWT, deleteProject);
export default router;
