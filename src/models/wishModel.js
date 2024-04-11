import mongoose from "mongoose";

const wishSchema = mongoose.Schema(
    {
        // user_id: {
        //     type: mongoose.Schema.ObjectId,
        //     required: true,
        //     unique: true
        // },
        subject: {
            type: mongoose.Schema.ObjectId,
            default: null
        },
        description: {
            type: String,
            default: "Need a friend to study better"
        },
        is_active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

export const Wish = mongoose.model("Wish", wishSchema);