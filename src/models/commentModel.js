import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        post_id: {
            type: mongoose.Schema.ObjectId,
            ref: "Post",
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Comment = mongoose.model("Comment", commentSchema);