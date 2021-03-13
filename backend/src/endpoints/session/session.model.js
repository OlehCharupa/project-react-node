import mongoose from "mongoose";
const Schema = mongoose.Schema

const sessionSchema = new Schema({
    uid: mongoose.Types.ObjectId,
});

export default mongoose.model("Session", sessionSchema);