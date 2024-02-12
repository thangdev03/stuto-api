import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        likes: {
            type: Number,
            default: 0
        },
        hashtag: [{
            type: String
        }],
        subject_id: [{
            type: mongoose.Schema.ObjectId,
            ref: "Subject"
        }]
    },
    {
        timestamps: true
    }
);

export const Post = mongoose.model("Post", postSchema);