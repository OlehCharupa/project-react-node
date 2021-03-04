//create token for user
import jwt from "jsonwebtoken";

//for password
import bcrypt from "bcrypt";

//validation data - Joi
import Joi from "joi";
// import model
// import User from './../models/userModel.js'
//
const schemaDataRegistration = Joi.object({
  // жду структуру бд (модели)
});
const schemaDataLogin = Joi.object({
  // жду структуру бд (модели)
});

const registerUser = async (req, res) => {
  try {
    const dataReq = await schemaDataRegistration.validateAsync(req.body);
    const { email, password } = dataReq;
    const saltRounds = 10;
    const saltPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      email,
      password: saltPassword,
      avatarURL: url,
      verificationToken: tokenId,
    });
    const a = await user.save();
    res.json(a);
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
    const dataUser = await User.findOne({ email: email });
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
          // process.env.JWT_SECRET,
          { expiresIn: 60 * 60 }
        );
        await User.findByIdAndUpdate(dataUser._id, { token });
        res.status(200).json({
          token: `Bearer ${token}`,
          user: {
            email: dataUser.email,
            subscription: "free",
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
const authentUser = async (req, res) => {
  const token = req.params["verificationToken"];
  console.log(token);
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
export { registerUser, loginUser, authentUser, logoutUser };
