import express from "express";
import { Conversation } from "../models/conversationModel.js"

const router = express.Router();

// Route for Save new Conversation
router.post("/", async (request, response) => {
  try {
    const newConversation = new Conversation({
      members: request.body.members
    })
    const conversation = await newConversation.save();
    return response.status(201).json(conversation);
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get all Conversation of an User
router.get("/:userId", async (request, response) => {
  try {
    const conversations = await Conversation.find({
        members: {$in: [request.params.userId]}
    });
    return response.status(200).json(conversations);
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

/*
// Route for Update Conversation
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
*/

/*
// Route for Delete Conversation
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