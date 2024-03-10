import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    major: {
      type: mongoose.Schema.ObjectId,
      ref: "Major",
      default: null
    },
    student_id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: Date,
      default: Date.now
    },
    sex: {
      type: String,
      enum: ["Nam", "Nữ", "Khác"],
      default: "Nam"
    },
    location: {
      type: String,
      default: null
    },
    avatar: {
      type: String,
      default: null
    },
    study_program: {
      type: String,
      enum: ["Chính quy", "Tiên tiến", "Quốc tế"],
      default: "Chính quy"
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    friends: [{
      type: mongoose.Schema.ObjectId,
      ref: "User"
    }]
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);