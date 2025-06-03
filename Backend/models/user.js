import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    aadhaar1: {
      type: String,
    },
    aadhaar2: {
      type: String,
    },
    parentName: { type: String },
    parentPhone: { type: String },
    localAddress: { type: String, required: true },
    isSameAddress: { type: Boolean, default: false },
    permanentAddress: { type: String },
    isStudent: { type: Boolean, default: false },
    isWorking: { type: Boolean, default: false },
    lastQualification: { type: String },
    year: { type: String },
    college: { type: String },
    designation: { type: String },
    company: { type: String },
    course: { type: String, required: true },
    howDidYouKnow: {
      type: String,
      enum: ["Google", "LinkedIn", "Instagram", "College TPO", "Friend"],
    },
    friendName: { type: String },
  },
  { timestamps: true }
);

const UserDetail = mongoose.model("UserDetail", userSchema);

export default UserDetail;
