import express from "express";
import { Major } from "../models/major.model.js"

const router = express.Router();

// Route for Save new Major
router.post("/", async (request, response) => {
  try {
    if (!request.body.name) {
      return response.status(400).send({ message: "Send all required fields: name" });
    }
    const newMajor = { name: request.body.name };
    const major = await Major.create(newMajor);
    return response.status(201).send(major);
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Major
router.get("/", async (request, response) => {
  try {
    const majors = await Major.find({});
    return response.status(200).json({
      data: majors
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
})

// Route for Get Major by Id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const major = await Major.findById(id);
    if (!major) {
      return response.status(404).send({ message: "Major not found!" });
    }
    return response.status(200).json(major)
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

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

export default router;