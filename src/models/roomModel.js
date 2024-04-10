import mongoose, { mongo } from "mongoose";

const roomSchema = mongoose.Schema(
    {
        subject: {
            type: mongoose.Schema.ObjectId,
            ref: "Subject"
        },
        conversation_id: {
            type: mongoose.Schema.ObjectId,
            ref: "Conversation"
        },
        name: {
            type: String,
            required: true
        },
        access_camera: {
            type: Boolean,
            default: true
        },
        access_mic: {
            type: Boolean,
            default: true
        },
        // owner: {
        //     type: mongoose.Schema.ObjectId,
        //     ref: "User",
        //     required: true
        // },
        participants: [
            {
                user_id: {
                    type: mongoose.Schema.ObjectId,
                    ref: "User"
                },
                join_at: {
                    type: Date,
                    default: Date.now
                },
                role: {
                    type: String,
                    enum: ["owner", "member"],
                    default: "member"
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

export const Room = mongoose.model("Room", roomSchema);