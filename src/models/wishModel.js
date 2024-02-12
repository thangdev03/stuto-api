import mongoose from "mongoose";

const wishSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.ObjectId,
            required: true,
            unique: true
        },
        description: {
            type: String,
            default: "Need a friend to study together"
        },
        isActive: {
            type: boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

export const Wish = mongoose.model("Wish", wishSchema);