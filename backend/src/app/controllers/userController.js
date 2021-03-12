//create token for user
import jwt from "jsonwebtoken";

//for password
import bcrypt from "bcrypt";

//validation data - Joi
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
// import model
import User from "./../models/userModel.js";
import regEmail from "./../../helpers/emailVerif.js";
//
const schemaDataRegistration = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(3).max(15).required(),
});
const schemaDataLogin = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(3).max(15).required(),
});
const schemaTokenEmail = Joi.object({
  token: Joi.string().min(3).max(15).required(),
});

const registerUser = async (req, res) => {
  try {
    const dataReq = await schemaDataRegistration.validateAsync(req.body);
    const { email, password } = dataReq;
    // res.json(dataReq);
    const saltRounds = 10;
    const saltPassword = await bcrypt.hash(password, saltRounds);
    const verifMail = await User.findOne({ email });
    const tokenId = uuidv4();
    if (verifMail === null) {
      const user = new User({
        email,
        password: saltPassword,
        verificationToken: tokenId,
      });
      const a = await user.save();
      regEmail(email, tokenId);
      res.json(a);
    } else {
      throw { error: 409, ResponseBody: "Email in use" };
    }
  } catch (e) {
    res.status(e.hasOwnProperty("error") ? e.error : 409).send({
      message: e.hasOwnProperty("ResponseBody") ? e.ResponseBody : e.details,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const dataReq = await schemaDataLogin.validateAsync(req.body);
    const { email, password } = dataReq;
    const dataUser = await User.findOne({ email });
    if (dataUser === null) {
      throw { error: 401, ResponseBody: "Email or password is wrong" };
    } else {
      const passwordData = await bcrypt.compareSync(
        password,
        dataUser.password
      );
      if (passwordData) {
        const token = jwt.sign(
          { email: dataUser.email, userId: dataUser._id },
          process.env.JWT_SECRET,
          { expiresIn: 60 * 60 }
        );
        await User.findByIdAndUpdate(dataUser._id, { token });
        res.status(200).json({
          token: `Bearer ${token}`,
          user: {
            email: dataUser.email,
          },
        });
      } else {
        throw { error: 401, ResponseBody: "Email or password is wrong" };
      }
    }
  } catch (e) {
    res.status(e.hasOwnProperty("error") ? e.error : 401).send({
      message: e.hasOwnProperty("ResponseBody") ? e.ResponseBody : e.details,
    });
  }
};
const authentUserMail = async (req, res) => {
  const tokenMail = req.params["verificationToken"];
  const dataReq = await schemaTokenEmail.validateAsync({
    token: tokenMail,
  });
  const { token } = dataReq;
  try {
    const dataUser = await User.findOne({ verificationToken: token });
    if (dataUser === null) {
      throw "Not authorized";
    } else {
      await User.findByIdAndUpdate(dataUser._id, {
        $unset: { verificationToken: token },
      });
      res.status(200).send({ message: "activated" });
    }
  } catch (e) {
    res.status(404).send({ message: "Not authorized" });
  }
};
const logoutUser = async (req, res) => {
  try {
    const user = req.user;
    const resultId = await User.findById(user._id);
    if (resultId === null) {
      throw { error: 401, ResponseBody: "Not authorized" };
    } else {
      await User.findByIdAndUpdate(user._id, { token: "token" });
      res
        .status(204)
        .send({ Authorization: "Bearer token", message: "No Content" });
    }
  } catch (e) {
    res.status(e.error).send({ message: e.ResponseBody });
  }
};
const authentUser = async (req, res) => {
  try {
    const user = req.user;
    const resultId = await User.findById(user._id);
    if (resultId === null) {
      throw { error: 401, ResponseBody: "Not authorized" };
    } else {
      res.json(user);
    }
  } catch (e) {
    res.status(e.error).send({ message: e.ResponseBody });
  }
};
export { registerUser, loginUser, authentUser, logoutUser, authentUserMail };
