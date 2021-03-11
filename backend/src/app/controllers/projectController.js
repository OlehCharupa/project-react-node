import Joi from "joi";
import User from "./../models/userModel.js";
import Project from "./../models/projectModel.js";

const schemaProject = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
});
const schemaDelete = Joi.object({
  id: Joi.string(),
});

const createProject = async (req, res) => {
  try {
    //get id user with token
    const idUser = req.user._id;

    //validate Joi
    const projectReq = await schemaProject.validateAsync(req.body);
    const { title, description } = projectReq;
    const newProject = new Project({
      title,
      description,
    });
    //push project in projects db
    let project = await newProject.save().then((project) => project.toJSON());
    //push id ref to array projects in user
    await User.updateOne({ _id: idUser }, { $push: { projects: project._id } });
    //get data user with projects across populate
    const dataPopulate = await User.findOne({ _id: idUser }).populate(
      "projects"
    );
    res.json(dataPopulate);
  } catch (e) {
    res.status(e.hasOwnProperty("error") ? e.error : 409).send({
      message: e.hasOwnProperty("ResponseBody") ? e.ResponseBody : e.details,
    });
  }
};
const deleteProject = async (req, res) => {
  try {
    const id = await schemaDelete.validateAsync({ id: req.params.projectId });
    const data = await Project.findByIdAndDelete(id.id);
    console.log(id);
    if (data !== null) {
      res.status(200).send({ message: "project deleted" });
    }
  } catch (e) {
    res.status(404).send({ message: "Not found" });
  }
};
export { createProject, deleteProject };
