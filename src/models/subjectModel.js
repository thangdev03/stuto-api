import mongoose from "mongoose";

const subjectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        }
    }
);

export const Subject = mongoose.model("Subject", subjectSchema);