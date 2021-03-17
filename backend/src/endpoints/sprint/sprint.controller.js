import luxon from "luxon";
import SprintModel from "./sprint.model.js";
import ProjectModel from "../project/project.model.js";
import TaskModel from "../task/task.model.js";

const DateTime = luxon.DateTime

export const addSprint = async (req, res) => {
    const user = req.user;
    const { title, startDate, duration } = req.body;
    const { projectId } = req.params;
    const project = await ProjectModel.findById(projectId);
    if (
        !project ||
        !user.projects.find(
            (userProjectId) => userProjectId.toString() === projectId
        )
    ) {
        return res.status(404).send({ message: "Project not found" });
    }
    const startDateArr = startDate.split("-");
    const startDateObj = DateTime.local(
        Number(startDateArr[2]),
        Number(startDateArr[1]),
        Number(startDateArr[0])
    );
    const endDate = startDateObj
        .plus({ days: duration - 1 })
        .toFormat("dd-MM-yyyy");
    const sprint = await SprintModel.create({
        title,
        startDate,
        endDate,
        duration,
        projectId,
        tasks: [],
    });
    project.sprints.push(sprint);
    await project.save();
    return res.status(201).send({
        title: sprint.title,
        startDate: sprint.startDate,
        endDate: sprint.endDate,
        duration: sprint.duration,
        id: sprint._id,
    });
};

export const loadSprints = async (req, res, next) => {
    const user = req.user;
    const { projectId } = req.params;
    const project = await ProjectModel.findById(projectId);
    if (!project) {
        return res.status(404).send({ message: "Project not found" });
    }
    if (!project.members.find((email) => email === user.email)) {
        return res
            .status(403)
            .send({ message: "You are not a contributor of this project" });
    }
    return ProjectModel.findById(projectId)
        .populate("sprints")
        .exec((err, data) => {
            if (err) {
                next();
            }
            // if (!data.sprints.length) {
            //     return res.status(200).send({ message: "No sprints found" });
            // }
            return res
                .status(200)
                .send(data.sprints);
        });
};

export const changeSprintTitle = async (req, res) => {
    const user = req.user;
    const { sprintId } = req.params;
    const { title } = req.body;
    const sprint = await SprintModel.findById(sprintId);
    if (
        !sprint ||
        !user.projects.find(
            (userProjectId) =>
                userProjectId.toString() === sprint.projectId.toString()
        )
    ) {
        return res.status(404).send({ message: "Sprint not found" });
    }
    sprint.title = title;
    await sprint.save();
    return res.status(200).send({ newTitle: sprint.title });
};

export const deleteSprint = async (req, res, next) => {
    const user = req.user;
    const { sprintId } = req.params;
    const sprint = await SprintModel.findById(sprintId);
    if (
        !sprint ||
        !user.projects.find(
            (userProjectId) =>
                userProjectId.toString() === sprint.projectId.toString()
        )
    ) {
        return res.status(404).send({ message: "Sprint not found" });
    }
    sprint.tasks.forEach(async (task) => {
        await TaskModel.findByIdAndDelete(task);
    });
    await SprintModel.findByIdAndDelete(sprintId);
    return res.status(204).end();
};