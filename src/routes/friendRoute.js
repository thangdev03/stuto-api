import express, { request, response } from "express";
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
        const currentUser = await User.findByIdAndUpdate(request.body.currentUserId, {$pull: {
            friends: request.body.friendId
        }});
        const friendUser = await User.findByIdAndUpdate(request.body.friendId, {$pull: {
            friends: request.body.currentUserId
        }});
        const resultDeleteInvite = Invitation.findOneAndDelete({$or: [
            { sender: request.body.currentUserId, receiver: request.body.friendId },
            { sender: request.body.friendId, receiver: request.body.currentUserId },
        ]});
        if (!currentUser && !friendUser && !resultDeleteInvite) {
            return response.status(404).send({ message: "Something went wrong when deleting!" });
        }
        return response.status(200).send({ message: "Delete friend relationship successfully!" });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

export default router;