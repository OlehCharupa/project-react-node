import express from "express";
import authenticateJWT from "./../../helpers/jwt.js";
import {
  createSprint,
  deleteSprint,
} from "./../controllers/sprintController.js";
let router = express.Router();
// POST routes
// data to post create -> (id.project, title, startDate, endDate, description, duration: number)
// везде string там где другой тип, там будет написано.
router.post("/create", createSprint);
router.delete("/:sprintId", authenticateJWT, deleteSprint);
export default router;
