import express from "express";
import { Message } from "../models/messageModel.js"
import { Conversation } from "../models/conversationModel.js";

const router = express.Router();

// Route for Save new Message
router.post("/", async (request, response) => {
  try {
    const newMessage = new Message(request.body);
    const message = await newMessage.save();
    return response.status(201).send(message);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get all Messages of an Conversation
router.get("/:conversationId", async (request, response) => {
  try {
    const messages = await Message.find({
      conversation: request.params.conversationId
    })
    return response.status(200).json(messages)
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

/*
// Route for Update Major
router.put("/:id", async (request, response) => {
  try {
    if (!request.body.name) {
      return response.status(400).send({
        message: "Send all required fields: name"
      });
    }
    const { id } = request.params;
    const result = await Major.findByIdAndUpdate(id, request.body);
    
    if (!result) {
      return response.status(404).send({ message: "Major not found!" });
    }
    return response.status(200).send({ message: "Major updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete Major
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Major.findByIdAndDelete(id, request.body);

    if (!result) {
      return response.status(404).send({ message: "Major not found!" });
    }
    return response.status(200).send({ message: "Major deleted successfully!" })
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
*/

export default router;