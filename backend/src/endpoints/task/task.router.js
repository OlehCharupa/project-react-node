import express from "express";
import mongoose from "mongoose";
import Joi from "joi";
import { authorize } from "../../auth/auth.controller.js";
import { asyncWrapper } from "../../helpers/asyncWrapper.js";
import validate from "../../helpers/validate.js";
import {
    addTask,
    loadTasks,
    changeWastedHours,
    deleteTask,
} from "./task.controller.js";

const Router = express.Router

const addTaskSchema = Joi.object({
    title: Joi.string().required(),
    hoursPlanned: Joi.number().required().min(1).max(8),
});

const addTaskIdSchema = Joi.object({
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

const taskIdSchema = Joi.object({
    taskId: Joi.string()
        .custom((value, helpers) => {
            const isValidObjectId = mongoose.Types.ObjectId.isValid(value);
            if (!isValidObjectId) {
                return helpers.message({
                    custom: "Invalid 'taskId'. Must be a MongoDB ObjectId",
                });
            }
            return value;
        })
        .required(),
});


const taskHoursSchema = Joi.object({
    date: Joi.string()
        .custom((value, helpers) => {
            const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
            const isValidDate = dateRegex.test(value);
            if (!isValidDate) {
                return helpers.message({
                    custom: "Invalid 'date'. Please, use DD-MM-YYYY string format",
                });
            }
            return value;
        })
        .required(),
    hours: Joi.number().required().min(0).max(8),
});

const router = Router();

router.post(
    "/:sprintId",
    asyncWrapper(authorize),
    validate(addTaskIdSchema, "params"),
    validate(addTaskSchema),
    asyncWrapper(addTask)
);
router.get(
    "/:sprintId",
    asyncWrapper(authorize),
    validate(addTaskIdSchema, "params"),
    asyncWrapper(loadTasks)
);
router.patch(
    "/:taskId",
    asyncWrapper(authorize),
    validate(taskIdSchema, "params"),
    validate(taskHoursSchema),
    asyncWrapper(changeWastedHours)
);
router.delete(
    "/:taskId",
    asyncWrapper(authorize),
    validate(taskIdSchema, "params"),
    asyncWrapper(deleteTask)
);

export default router;