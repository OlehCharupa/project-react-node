import express from "express";
import { createTask } from "./../controllers/taskController.js";
let router = express.Router();
// POST routes
// data to post create -> (id-sprint, title, hoursPlanned: number)
// везде string там где другой тип, там будет написано.

router.post("/create", createTask);
export default router;
