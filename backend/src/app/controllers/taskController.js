import Joi from "joi";
import Sprint from "../models/sprintModel.js";
import Task from "../models/taskModel.js";

const schemaDataTask = Joi.object({
  sprintId: Joi.string(),
  title: Joi.string(),
  hoursPlanned: Joi.number(),
  hoursWasted: Joi.number(),
});
const schemaDelete = Joi.object({
  id: Joi.string(),
});

const createTask = async (req, res) => {
  try {
    const taskReq = await schemaDataTask.validateAsync(req.body);
    const { sprintId, title, hoursPlanned } = taskReq;
    const newTask = new Task({
      title,
      hoursPlanned,
      hoursWasted: 0,
    });

    let task = await newTask.save().then((task) => task.toJSON());
    await Sprint.updateOne({ _id: sprintId }, { $push: { tasks: task._id } });
    const dataPopulate = await Sprint.findOne({ _id: sprintId }).populate(
      "tasks"
    );
    res.json(dataPopulate);
  } catch (e) {
    res.status(e.hasOwnProperty("error") ? e.error : 409).send({
      message: e.hasOwnProperty("ResponseBody") ? e.ResponseBody : e.details,
    });
  }
};
const deleteTask = async (req, res) => {
  try {
    const id = await schemaDelete.validateAsync({ id: req.params.taskId });
    const data = await Task.findByIdAndDelete(id.id);
    console.log(id);
    if (data !== null) {
      res.status(200).send({ message: "task deleted" });
    }
  } catch (e) {
    res.status(404).send({ message: "Not found" });
  }
};
export { createTask, deleteTask };
