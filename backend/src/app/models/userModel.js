import mongoose from "mongoose";
const Schema = mongoose.Schema;

const users = new Schema({
  login: String,
  email: String,
  password: String,
  token: String,
  verificationToken: String,
});
export default mongoose.model("users", users);
