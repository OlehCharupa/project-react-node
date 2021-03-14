import express from "express";
import Joi from "joi";
import { authorize } from "../../auth/auth.controller.js";
import { asyncWrapper } from "../../helpers/asyncWrapper.js";
import validate from "../../helpers/validate.js";
import {
    addProject,
    addContributor,
    loadUsersProjects,
    changeProjectTitle,
    deleteProject,
} from "./project.controller.js";
import { addSprintIdSchema } from "../sprint/sprint.routes.js";

const Router = express.Router

const addProjectSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
});

const addContributorSchema = Joi.object({
    email: Joi.string().required(),
});

const changeTitleSchema = Joi.object({
    title: Joi.string().required(),
});

const router = Router();

router.post(
    "/",
    asyncWrapper(authorize),
    validate(addProjectSchema),
    asyncWrapper(addProject)
);
router.patch(
    "/contributor/:projectId",
    asyncWrapper(authorize),
    validate(addSprintIdSchema, "params"),
    validate(addContributorSchema),
    asyncWrapper(addContributor)
);
router.get("/", asyncWrapper(authorize), asyncWrapper(loadUsersProjects));
router.patch(
    "/title/:projectId",
    asyncWrapper(authorize),
    validate(addSprintIdSchema, "params"),
    validate(changeTitleSchema),
    asyncWrapper(changeProjectTitle)
);
router.delete(
    "/:projectId",
    asyncWrapper(authorize),
    validate(addSprintIdSchema, "params"),
    asyncWrapper(deleteProject)
);

export default router;