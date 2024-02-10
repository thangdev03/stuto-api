import mongoose, { Schema } from "mongoose";

const accountSchema = mongoose.Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        username: {
            type: String,
            required: true
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