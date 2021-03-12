import mongoose from "mongoose";
const Schema = mongoose.Schema;

const sprint = new Schema({
  title: String,
  startDate: String,
  endDate: String,
  description: String,
  duration: Number,
  tasks: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Task",
    },
  ],
});
export default mongoose.model("Sprint", sprint);
