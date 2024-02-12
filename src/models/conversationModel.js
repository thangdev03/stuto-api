import mongoose from "mongoose";

const messagesSchema = mongoose.Schema(
    {
        sender_id: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        message: {
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

const conversationSchema = mongoose.Schema(
    {
        members: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            }
        ],
        messages: [messagesSchema],
        attachment_url: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export const Conversation = mongoose.model("Conversation", conversationSchema);