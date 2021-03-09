//create token for user
import jwt from "jsonwebtoken";

//for password
import bcrypt from "bcrypt";

//validation data - Joi
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
// import model
import User from "../models/userModel.js";
import regEmail from "../../helpers/emailVerif.js";
//
const schemaDataRegistration = Joi.object({
  login: Joi.string(),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(3).max(15).required(),
});

const createSprint = async (req, res) => {
  try {
    res.json("hello sprint");
    // const dataReq = await schemaDataRegistration.validateAsync(req.body);
    // const { login, email, password } = dataReq;
    // // res.json(dataReq);
    // const saltRounds = 10;
    // const saltPassword = await bcrypt.hash(password, saltRounds);
    // const verifMail = await User.findOne({ email });
    // const tokenId = uuidv4();
    // if (verifMail === null) {
    //   const user = new User({
    //     login,
    //     email,
    //     password: saltPassword,
    //     verificationToken: tokenId,
    //   });
    //   const a = await user.save();
    //   regEmail(email, tokenId);
    //   res.json(a);
    // } else {
    //   throw { error: 409, ResponseBody: "Email in use" };
    // }
  } catch (e) {
    // res.status(e.hasOwnProperty("error") ? e.error : 409).send({
    //   message: e.hasOwnProperty("ResponseBody") ? e.ResponseBody : e.details,
    // });
  }
};
export { createSprint };
