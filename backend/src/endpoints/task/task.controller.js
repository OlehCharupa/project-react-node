import luxon from "luxon";
import SprintModel from "../sprint/sprint.model.js";
import TaskModel from "./task.model.js";
import ProjectModel from "../project/project.model.js";

const DateTime = luxon.DateTime

export const addTask = async (req, res) => {
    const user = req.user;
    const { title, hoursPlanned } = req.body;
    const { sprintId } = req.params;
    const sprint = await SprintModel.findOne({ _id: sprintId });
    if (
        !sprint ||
        !user.projects.find(
            (projectId) => projectId.toString() === sprint.projectId.toString()
        )
    ) {
        return res.status(404).send({ message: "Sprint not found" });
    }
    const hoursWastedPerDay = [];
    const startDateArr = sprint.startDate.split("-");
    const startDateObj = DateTime.local(
        Number(startDateArr[2]),
        Number(startDateArr[1]),
        Number(startDateArr[0])
    );
    for (let i = 0; i < sprint.duration; i++) {
        hoursWastedPerDay.push({
            currentDay: startDateObj.plus({ days: i }).toFormat("dd-MM-yyyy"),
            singleHoursWasted: 0,
        });
    }
    const task = await TaskModel.create({
        title,
        hoursPlanned,
        hoursWasted: 0,
        hoursWastedPerDay,
    });
    sprint.tasks.push(task);
    await sprint.save();
    return res.status(201).send({
        title,
        hoursPlanned,
        hoursWasted: 0,
        id: task._id,
        hoursWastedPerDay,
    });
};

export const loadTasks = async (req, res, next) => {
    const user = req.user;
    const { sprintId } = req.params;
    const sprint = await SprintModel.findById(sprintId);
    if (!sprint) {
        return res.status(404).send({ message: "Sprint not found" });
    }
    const project = await ProjectModel.findById(sprint.projectId);
    if (
        !project.members.find(
            (email) => email === user.email
        )
    ) {
        return res
            .status(403)
            .send({ message: "You are not a contributor of this project" });
    }
    return SprintModel.findById(sprintId)
        .populate("tasks")
        .exec((err, data) => {
            if (err) {
                next();
            }
            // if (!data.tasks.length) {
            //     return res.status(200).send({ message: "No tasks found" });
            // }
            return res.status(200).send(data.tasks);
        });
};

export const changeWastedHours = async (req, res) => {
    const { taskId } = req.params;
    const { date, hours } = req.body;
    const task = await TaskModel.findById(taskId);
    if (!task) {
        return res.status(404).send({ message: "Task not found" });
    }
    const day = task.hoursWastedPerDay.find((day) => day.currentDay === date);
    if (!day) {
        return res.status(404).send({ message: "Day not found" });
    }
    if (hours > day.singleHoursWasted) {
        const diff = hours - day.singleHoursWasted;
        task.hoursWasted += diff;
        day.singleHoursWasted = hours;
        await task.save();
        return res.status(200).send({ day, newWastedHours: task.hoursWasted });
    }
    if (hours < day.singleHoursWasted) {
        const diff = day.singleHoursWasted - hours;
        task.hoursWasted -= diff;
        day.singleHoursWasted = hours;
        await task.save();
        return res.status(200).send({ day, newWastedHours: task.hoursWasted });
    }
    return res.status(200).send({ message: "You can't set the same hours" });
};

export const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    const task = await TaskModel.findById(taskId);
    if (!task) {
        return res.status(404).send({ message: "Task not found" });
    }
    await TaskModel.findByIdAndDelete(taskId);
    return res.status(204).end();
};