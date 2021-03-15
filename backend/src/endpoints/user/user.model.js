import mongoose from "mongoose";
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: String,
    passwordHash: String,
    projects: [{ type: mongoose.Types.ObjectId, ref: "Project" }],
});

export default mongoose.model("User", userSchema);