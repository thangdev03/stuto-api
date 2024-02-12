import express from "express";
import { Subject } from "../models/subjectModel.js"

const router = express.Router();

// Route for Save new Subject
router.post("/", async (request, response) => {
  try {
    if (!request.body.name) {
      return response.status(400).send({ message: "Send all required fields: name" });
    }
    const newSubject = { name: request.body.name };
    const subject = await Subject.create(newSubject);
    return response.status(201).send(subject);
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Subject
router.get("/", async (request, response) => {
  try {
    const subjects = await Subject.find({});
    return response.status(200).json({
      data: subjects
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
})

// Route for Get Subject by Id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const subject = await Subject.findById(id);
    if (!subject) {
      return response.status(404).send({ message: "Subject not found!" });
    }
    return response.status(200).json(subject)
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update Subject
router.put("/:id", async (request, response) => {
  try {
    if (!request.body.name) {
      return response.status(400).send({
        message: "Send all required fields: name"
      });
    }
    const { id } = request.params;
    const result = await Subject.findByIdAndUpdate(id, request.body);
    
    if (!result) {
      return response.status(404).send({ message: "Subject not found!" });
    }
    return response.status(200).send({ message: "Subject updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete Subject
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Subject.findByIdAndDelete(id, request.body);

    if (!result) {
      return response.status(404).send({ message: "Subject not found!" });
    }
    return response.status(200).send({ message: "Subject deleted successfully!" })
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;