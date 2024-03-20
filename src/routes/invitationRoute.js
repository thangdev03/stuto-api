import express, { request, response } from "express"
import { Invitation } from "../models/invitationModel.js";
import { User } from "../models/userModel.js";

const router = express.Router();

// Get all pending invitations sent to an user
router.get("/:userId", async (request, response) => {
    try {
        const { userId } = request.params;
        const invitations = await Invitation.find({receiver: userId, status: "pending"}).populate("sender");
        if (invitations.length === 0) {
            return response.status(404).send({ message: "Not found any invitations!" });
        }
        return response.status(200).send(invitations);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Send invitation
router.post("/send", async (request, response) => {
    try {
        const checkReceived = await Invitation.findOne({sender: request.body.receiver, receiver: request.body.sender});
        const checkExisted = await Invitation.findOne({sender: request.body.sender, receiver: request.body.receiver});
        if (checkReceived || checkExisted) {
            return response.status(501).send({message: "The invitation has already existed!"});
        }
        const newInvite = await Invitation.create(request.body);
        return response.status(201).send(newInvite);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Accept invitation
router.put("/accept/:invitationId", async (request, response) => {
    try {
        const { invitationId } = request.params;
        const invitation = await Invitation.findByIdAndUpdate(invitationId, {$set: {status: "accepted"}});
        if (!invitation) {
            return response.status(404).send({ message: "Invitation not found" });
        }
        const user1 = await User.findByIdAndUpdate(invitation.sender, {$push: {friends: invitation.receiver}});
        const user2 = await User.findByIdAndUpdate(invitation.receiver, {$push: {friends: invitation.sender}});
        return user1 && user2 && response.status(200).send({ message: "Friendship created successfully" });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

// Cancel or delete invitation
router.delete("/:invitationId", async (request, response) => {
    try {
        const { invitationId } = request.params;
        const result = await Invitation.findByIdAndDelete(invitationId);
        if (!result) {
            return response.status(400).send({ message: "Invitation not found!" })
        }
        return response.status(200).send({ message: "Invitation deleted successfully!" })
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

export default router;