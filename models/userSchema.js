import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 Characters"],
    maxlength: [20, "Name must be at most 20 Characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [10, "Password must be at least 10 characters"],
  },
  contactPerson: { type: String },
  role: {
    type: String,
    required: [true, "role is required"],
    enum: ["company", "applicant"],
    default: "applicant",
  },
});

const userModel = model("users", userSchema);
export default userModel;
