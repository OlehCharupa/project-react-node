import mongoose from "mongoose";
const Schema = mongoose.Schema;

const user = new Schema({
  email: String,
  password: String,
  token: String,
  verificationToken: String,
  projects: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Project",
    },
  ],
});
export default mongoose.model("User", user);
