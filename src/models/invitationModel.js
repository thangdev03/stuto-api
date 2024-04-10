import mongoose from "mongoose";

const invitationSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    note: {
      type: String
    },
    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending"
    }
  },
  {
    timestamps: true,
  }
);

export const Invitation = mongoose.model("Invitation", invitationSchema);
