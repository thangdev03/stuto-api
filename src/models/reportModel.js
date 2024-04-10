import mongoose from "mongoose";

const reportSchema = mongoose.Schema(
    {
        creator: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        target_url: {
            type: String,
        },
        description: {
            type: String,
            required: True
        },
        status: {
            type: String,
            enum: ["pending", "solved", "rejected"],
            default: "pending"
        },
        report_type: {
            type: String,
            enum: ["Violent", "Nudity", "Racist", "Spam"],
            default: "Spam"
        }
    },
    {
        timestamps: true
    }
);

export const Report = mongoose.model("Report", reportSchema)