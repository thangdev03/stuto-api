import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "client",
            enum: ["admin", "client"]
        }
    },
    {
        timestamps: true
    }
);

export const Account = mongoose.model("Account", accountSchema);