import mongoose from "mongoose";
const Schema = mongoose.Schema

const projectSchema = new Schema({
    title: String,
    description: String,
    members: [String],
    sprints: [{ type: mongoose.Types.ObjectId, ref: "Sprint" }],
});

export default mongoose.model(
    "Project",
    projectSchema
);