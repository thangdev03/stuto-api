import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
    {
        conversation: {
            type: mongoose.Schema.ObjectId,
            ref: "Conversation"
        },
        sender: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        text: {
            type: String
        },
        attachment_url: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export const Message = mongoose.model("Message", messageSchema);
