import mongoose from "mongoose";

const adSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  shortDescription: {
    type: String,
    required: [true, "short description is required"],
  },
  longDescription: {
    type: String,
  },
  skills: { type: String },
  offers: {
    type: String,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Company reference is required"],
  },
});

const adModel = mongoose.model("ads", adSchema);
export default adModel;
