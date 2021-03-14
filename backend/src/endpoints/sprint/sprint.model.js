import mongoose from "mongoose";
const Schema = mongoose.Schema

const sprintSchema = new Schema({
    title: String,
    duration: Number,
    startDate: String,
    endDate: String,
    projectId: mongoose.Types.ObjectId,
    tasks: [{ type: mongoose.Types.ObjectId, ref: "Task" }],
});

export default mongoose.model(
    "Sprint",
    sprintSchema
);