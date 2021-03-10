import express from "express";
import { createSprint } from "./../controllers/sprintController.js";
let router = express.Router();
// POST routes
router.post("/create", createSprint);
export default router;
