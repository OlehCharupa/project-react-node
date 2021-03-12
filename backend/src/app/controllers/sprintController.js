import Joi from "joi";
import Project from "../models/projectModel.js";
import Sprint from "../models/sprintModel.js";

const schemaDataSprint = Joi.object({
  projectId: Joi.string(),
  title: Joi.string(),
  startDate: Joi.string(),
  endDate: Joi.string(),
  description: Joi.string(),
  duration: Joi.number(),
});
const schemaDelete = Joi.object({
  id: Joi.string(),
});

const createSprint = async (req, res) => {
  try {
    const sprintReq = await schemaDataSprint.validateAsync(req.body);
    const {
      projectId,
      title,
      startDate,
      endDate,
      description,
      duration,
    } = sprintReq;
    const newSprint = new Sprint({
      title,
      startDate,
      endDate,
      description,
      duration,
    });

    let sprint = await newSprint.save().then((sprint) => sprint.toJSON());
    await Project.updateOne(
      { _id: projectId },
      { $push: { sprints: sprint._id } }
    );
    const dataPopulate = await Project.findOne({ _id: projectId }).populate(
      "sprints"
    );
    res.json(dataPopulate);
  } catch (e) {
    res.status(e.hasOwnProperty("error") ? e.error : 409).send({
      message: e.hasOwnProperty("ResponseBody") ? e.ResponseBody : e.details,
    });
  }
};
const deleteSprint = async (req, res) => {
  try {
    const id = await schemaDelete.validateAsync({ id: req.params.sprintId });
    const data = await Sprint.findByIdAndDelete(id.id);
    console.log(id);
    if (data !== null) {
      res.status(200).send({ message: "sprint deleted" });
    }
  } catch (e) {
    res.status(404).send({ message: "Not found" });
  }
};
export { createSprint, deleteSprint };
