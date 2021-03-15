import express from "express";
const Router = express.Router
import Joi from "joi";
import mongoose from "mongoose";
import { asyncWrapper } from "../helpers/asyncWrapper.js";
import {
    register,
    login,
    refreshTokens,
    logout,
    authorize,
} from "./auth.controller.js";
import validate from "../helpers/validate.js";

const signUpInSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const refreshTokensSchema = Joi.object({
    sid: Joi.string()
        .custom((value, helpers) => {
            const isValidObjectId = mongoose.Types.ObjectId.isValid(value);
            if (!isValidObjectId) {
                return helpers.message({
                    custom: "Invalid 'sid'. Must be a MongoDB ObjectId",
                });
            }
            return value;
        })
        .required(),
});

const router = Router();

router.post("/register", validate(signUpInSchema), asyncWrapper(register));
router.post("/login", validate(signUpInSchema), asyncWrapper(login));
router.post("/logout", asyncWrapper(authorize), asyncWrapper(logout));
router.post(
    "/refresh",
    validate(refreshTokensSchema),
    asyncWrapper(refreshTokens)
);

export default router;