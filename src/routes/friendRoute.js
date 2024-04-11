import express from "express";
import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import { Invitation } from "../models/invitationModel.js";

const router = express.Router();

// Get all friends of an user
router.get("/:userId", async (request, response) => {
    try {
        const { userId } = request.params;
        const user = await User.findById(userId).populate("friends");
        const populatedUser = await User.populate(user, {path: "friends", populate: {path: "major"}});
        const friendsList = await populatedUser.friends;
        console.log(friendsList)
        return response.status(200).send(friendsList);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

// Unfriend and delete relative invitation
router.delete("/", async (request, response) => {
    try {
        const ObjectId = mongoose.Types.ObjectId;
        const {currentUserId, friendId, invitationId} = request.body;
        const currentUser = await User.findByIdAndUpdate(currentUserId, {$pull: {
            friends: friendId
        }});
        const friendUser = await User.findByIdAndUpdate(friendId, {$pull: {
            friends: currentUserId
        }});
        const resultDeleteInvite = await Invitation.findByIdAndDelete(invitationId);
        if (!currentUser || !friendUser || !resultDeleteInvite) {
            return response.status(404).send({ message: "Something went wrong when deleting!" });
        }
        return response.status(200).send({ message: "Delete friend relationship successfully!" });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

export default router;