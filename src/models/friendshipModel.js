import mongoose from "mongoose";

const friendshipSchema = mongoose.Schema(
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

export const Friendship = mongoose.model("Friendship", friendshipSchema);
