import mongoose from "mongoose";

const majorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        study_program: {
            type: String,
            enum: ["Chính quy", "Tiên tiến", "Quốc tế"],
            default: "Chính quy"
        }
    }
);

export const Major = mongoose.model("Major", majorSchema);