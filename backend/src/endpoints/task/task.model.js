import mongoose from "mongoose";
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: String,
    hoursPlanned: Number,
    hoursWasted: Number,
    hoursWastedPerDay: [
        { currentDay: String, singleHoursWasted: Number, _id: false },
    ],
});

export default mongoose.model("Task", taskSchema);