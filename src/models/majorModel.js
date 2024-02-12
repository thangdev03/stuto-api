import mongoose from "mongoose";

const majorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        }
    }
);

export const Major = mongoose.model("Major", majorSchema);