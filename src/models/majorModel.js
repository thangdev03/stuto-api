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
        },
        referenceCount: {
            type: Number,
            default: 0
        }
    }
);

export const Major = mongoose.model("Major", majorSchema);