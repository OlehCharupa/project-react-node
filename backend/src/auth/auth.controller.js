import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import {
//     ISession,
//     IJWTPayload,
//     IUserPopulated,
// } from "../helpers/typescript-helpers/interfaces";
import UserModel from "../endpoints/user/user.model.js";
import SessionModel from "../endpoints/session/session.model.js";
import ProjectModel from "../endpoints/project/project.model.js";
import SprintModel from "../endpoints/sprint/sprint.model.js";
import TaskModel from "../endpoints/task/task.model.js";

export const register = async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        return res
            .status(409)
            .send({ message: `User with ${email} email already exists` });
    }
    const passwordHash = await bcrypt.hash(
        password,
        Number(process.env.HASH_POWER)
    );
    const newUser = await UserModel.create({
        email,
        passwordHash,
        projects: [],
    });
    return res.status(201).send({
        email,
        id: newUser._id,
    });
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res
            .status(403)
            .send({ message: `User with ${email} email doesn't exist` });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
        return res.status(403).send({ message: "Password is wrong" });
    }
    const newSession = await SessionModel.create({
        uid: user._id,
    });
    const accessToken = jwt.sign(
        { uid: user._id, sid: newSession._id },
        process.env.JWT_SECRET, // должна быть строка
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME,
        }
    );
    const refreshToken = jwt.sign(
        { uid: user._id, sid: newSession._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME,
        }
    );
    return UserModel.findOne({ email })
        .populate({
            path: "projects",
            model: ProjectModel,
            populate: [
                {
                    path: "sprints",
                    model: SprintModel,
                    populate: {
                        path: "tasks",
                        model: TaskModel,
                    },
                },
            ],
        })
        .exec((err, data) => {
            if (err) {
                next(err);
            }
            return res.status(200).send({
                accessToken,
                refreshToken,
                sid: newSession._id,
                data: {
                    email: data.email,
                    id: data._id,
                    projects: data.projects,
                },
            });
        });
};

export const authorize = async (
    req,
    res,
    next
) => {
    const authorizationHeader = req.get("Authorization");
    if (authorizationHeader) {
        const accessToken = authorizationHeader.replace("Bearer ", "");
        let payload //: string | object;
        try {
            payload = jwt.verify(accessToken, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        const user = await UserModel.findById(payload.uid);
        const session = await SessionModel.findById(payload.sid);
        if (!user) {
            return res.status(404).send({ message: "Invalid user" });
        }
        if (!session) {
            return res.status(404).send({ message: "Invalid session" });
        }
        req.user = user;
        req.session = session;
        next();
    } else return res.status(400).send({ message: "No token provided" });
};

export const refreshTokens = async (req, res) => {
    const authorizationHeader = req.get("Authorization");
    if (authorizationHeader) {
        const activeSession = await SessionModel.findById(req.body.sid);
        if (!activeSession) {
            return res.status(404).send({ message: "Invalid session" });
        }
        const reqRefreshToken = authorizationHeader.replace("Bearer ", "");
        // let payload: string | object;
        let payload
        try {
            payload = jwt.verify(reqRefreshToken, process.env.JWT_SECRET);
        } catch (err) {
            await SessionModel.findByIdAndDelete(req.body.sid);
            return res.status(401).send({ message: "Unauthorized" });
        }
        const user = await UserModel.findById(payload.uid);
        const session = await SessionModel.findById(payload.sid);
        if (!user) {
            return res.status(404).send({ message: "Invalid user" });
        }
        if (!session) {
            return res.status(404).send({ message: "Invalid session" });
        }
        await SessionModel.findByIdAndDelete(payload.sid);
        const newSession = await SessionModel.create({
            uid: user._id,
        });
        const newAccessToken = jwt.sign(
            { uid: user._id, sid: newSession._id },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME,
            }
        );
        const newRefreshToken = jwt.sign(
            { uid: user._id, sid: newSession._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME }
        );
        return res
            .status(200)
            .send({ newAccessToken, newRefreshToken, newSid: newSession._id });
    }
    return res.status(400).send({ message: "No token provided" });
};

export const logout = async (req, res) => {
    const currentSession = req.session;
    await SessionModel.deleteOne({ _id: currentSession._id });
    req.user = null;
    req.session = null;
    return res.status(204).end();
};