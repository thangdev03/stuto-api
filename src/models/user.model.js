import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema(
  {
    major: {
      type: Schema.Types.ObjectId,
      ref: "Major"
    },
    student_id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    date_of_birth: {
      type: Date,
    },
    sex: {
      type: String,
      enum: ["Nam", "Nữ", "Khác"],
      required: true,
    },
    location: {
      type: String,
    },
    avatar: {
      type: String,
    },
    study_program: {
      type: String,
      enum: ["Chính quy", "Tiên tiến", "Quốc tế"],
    },
    is_active: {
      type: Boolean,
      default: True,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);