import { Schema, model } from "mongoose";

const users = new Schema({
  // жду схему бд (модели)
});
const modelUser = model("User", users);
export default modelUser;
