import mongoose from "mongoose";

const conversationSchema = mongoose.Schema(
    {
        members: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        timestamps: true
    }
);

export const Conversation = mongoose.model("Conversation", conversationSchema);