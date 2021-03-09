//create token for user
import jwt from "jsonwebtoken";

import Joi from "joi";
import User from "./../models/userModel.js";
import Project from "./../models/projectModel.js";
//
// const schemaProject = Joi.object({
//   title: Joi.string(),
//   description: Joi.string(),
// });

const createProject = async (req, res) => {
  try {
    // res.json(req.user._id);
    const idUser = req.user._id;
    // const dataReq = await schemaProject.validateAsync(req.body);
    // const { title, description } = dataReq;

    let newProject = new Project({
      title: "title",
      description: "discription",
      user_id: idUser,
    });
    newProject.save();
    const user = await User.find({ _id: idUser })
      .populate({
        path: "projects",
        select: "title",
      })
      .exec();
    res.json(user);
    // const a = await newProject.save();
    // res.json(a);
    // const b = await Project.populate(newComment, { path: "User" }).then(
    //   (comment) => {
    //     res.json({
    //       message: "Comment added",
    //       comment,
    //     });
    //   }
    // );
    // .then((result) => {
    //   Project.populate(newComment, { path: "User" }).then((comment) => {
    //     res.json({
    //       message: "Comment added",
    //       comment,
    //     });
    //   });
    // });
    //     // res.json(dataReq);
    //     const saltRounds = 10;
    //     const saltPassword = await bcrypt.hash(password, saltRounds);
    //     const verifMail = await User.findOne({ email });
    //     const tokenId = uuidv4();
    //     if (verifMail === null) {
    //       const user = new User({
    //         login,
    //         email,
    //         password: saltPassword,
    //         verificationToken: tokenId,
    //       });
    //       const a = await user.save();
    //       regEmail(email, tokenId);
    //       res.json(a);
    //     } else {
    //       throw { error: 409, ResponseBody: "Email in use" };
    //     }
  } catch (e) {
    // res.status(e.hasOwnProperty("error") ? e.error : 409).send({
    //   message: e.hasOwnProperty("ResponseBody") ? e.ResponseBody : e.details,
    // });
  }
};
export { createProject };
