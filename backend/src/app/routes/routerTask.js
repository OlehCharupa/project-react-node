import express from "express";
import { createTask } from "./../controllers/taskController.js";
let router = express.Router();
// POST routes
router.post("/create", createTask);
export default router;
