import express from "express";
import { Room } from "../models/roomModel.js";
import { User } from "../models/userModel.js";

const router = express.Router();

// Get the total number of rooms
router.get("/statistic/:userId", async (request, response) => {
  try {
    const { userId } = request.params;
    const admin = await User.findById(userId);
    if (admin) {
      const rooms = await Room.find({});
      return response.status(200).json(rooms);
    } else {
      return response.status(405).send({ message: "Sorry, you are not allowed for this API route." });
    }
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
})

// Get all room of an user
router.get("/all/:userId", async (request, response) => {
  try {
    const { userId } = request.params;
    const rooms = await Room.find({
      participants: {
        $elemMatch: { user_id: userId },
      },
    }).populate("subject");
    return response.status(200).json(rooms);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// Get room by ID
router.get("/:roomId", async (request, response) => {
  try {
    const { roomId } = request.params;
    const room = await Room.findById(roomId)
      .populate("subject")
      .populate("participants.user_id");
    return response.status(200).json(room);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// Create a new room
router.post("/", async (request, response) => {
  try {
    const newRoom = new Room({
        subject: request.body.subject,
        name: request.body.name,
        access_camera: request.body.access_camera,
        access_mic: request.body.access_mic,
        cover: request.body.cover,
        participants: [{
            user_id: request.body.user_id,
            join_at: new Date(),
            role: "owner"
        }]
    });
    const savedRoom = await newRoom.save();
    return response.status(201).json(savedRoom);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// Delete a room
router.delete("/:roomId", async (request, response) => {
    try {
        const { roomId } = request.params;
        const result = await Room.findByIdAndDelete(roomId);
        return response.status(200).send({ message: "Room deleted successfully!" })
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
})

// Update a room info
router.put("/:roomId", async (request, response) => {
    try {
        const { roomId } = request.params;
        const query = {
            subject: request.body.subject,
            name: request.body.name,
            access_camera: request.body.access_camera,
            access_mic: request.body.access_mic,
            cover: request.body.cover
        }
        const result = await Room.findByIdAndUpdate(roomId, {$set: query})
        return response.status(200).send({ message: "Room updated successfully!" })
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
})

export default router;
