import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
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
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Company reference is required"],
  },
});

const jobModel = mongoose.model("jobs", jobSchema);
export default jobModel;
