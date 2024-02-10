import mongoose from "mongoose";

const majorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    }
);

export const Major = mongoose.model("Major", majorSchema);