import express from "express";
const Router = express.Router
import mongoose from "mongoose";
import Joi from "joi";
import { authorize } from "../../auth/auth.controller.js";
import { asyncWrapper } from "../../helpers/asyncWrapper.js";
import validate from "../../helpers/validate.js";
import {
    addSprint,
    loadSprints,
    changeSprintTitle,
    deleteSprint,
} from "./sprint.controller.js";

const addSprintSchema = Joi.object({
    title: Joi.string().required(),
    endDate: Joi.string()
        .custom((value, helpers) => {
            const dateRegex = /^\d{4}\-([1-9]|1[012])\-([1-9]|[12][0-9]|3[01])$/;
            const isValidDate = dateRegex.test(value);
            if (!isValidDate) {
                return helpers.message({
                    custom: "Invalid 'date'. Please, use YYYY-MM-DD string format",
                });
            }
            return value;
        })
        .required(),
    duration: Joi.number().required().min(1),
});

export const addSprintIdSchema = Joi.object({
    projectId: Joi.string()
        .custom((value, helpers) => {
            const isValidObjectId = mongoose.Types.ObjectId.isValid(value);
            if (!isValidObjectId) {
                return helpers.message({
                    custom: "Invalid 'projectId'. Must be a MongoDB ObjectId",
                });
            }
            return value;
        })
        .required(),
});

export const patchSprintIdSchema = Joi.object({
    sprintId: Joi.string()
        .custom((value, helpers) => {
            const isValidObjectId = mongoose.Types.ObjectId.isValid(value);
            if (!isValidObjectId) {
                return helpers.message({
                    custom: "Invalid 'sprintId'. Must be a MongoDB ObjectId",
                });
            }
            return value;
        })
        .required(),
});

const changeTitleSchema = Joi.object({
    title: Joi.string().required(),
});

const router = Router();

router.post(
    "/:projectId",
    asyncWrapper(authorize),
    validate(addSprintIdSchema, "params"),
    validate(addSprintSchema),
    asyncWrapper(addSprint)
);
router.get(
    "/:projectId",
    asyncWrapper(authorize),
    validate(addSprintIdSchema, "params"),
    asyncWrapper(loadSprints)
);
router.patch(
    "/title/:sprintId",
    asyncWrapper(authorize),
    validate(patchSprintIdSchema, "params"),
    validate(changeTitleSchema),
    asyncWrapper(changeSprintTitle)
);
router.delete(
    "/:sprintId",
    asyncWrapper(authorize),
    validate(patchSprintIdSchema, "params"),
    asyncWrapper(deleteSprint)
);

export default router;