import mongoose from "mongoose";

const friendshipSchema = mongoose.Schema(
  {
    user1: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    user2: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Friendship = mongoose.model("Friendship", friendshipSchema);
