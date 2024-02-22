import express from "express"
import bcrypt from "bcryptjs"
import { User } from "../models/userModel.js"
import { Account } from "../models/accountModel.js";


const router = express.Router();

// Route for Create new User and Account
router.post("/register", async (request, response) => {
  try {
      if (!request.body) {
          return response.status(400).send({ message: "Send all fields required" });
      }
      const existingEmail = await Account.findOne({email: request.body.email});
      if (existingEmail) {
        return response.status(400).send({ message: "Email existed, please use another email" })
      }
      
      const newUser = { name: request.body.name };
      const user = await User.create(newUser);
      const newPassword = await bcrypt.hash(request.body.password, 16)

      await Account.create({
          user_id: user.id,
          email: request.body.email,
          password: newPassword,
          role: request.body.role
      });
      
      return response.status(201).send({ message: "User created successfully!" });
  } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
  }
});

// Route for Get all User
router.get("/", async (request, response) => {
  try {
    const users = await User.find({});
    return response.status(200).json({
      data: users
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
  
// Route for Get User by Id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id);
    if (!user) {
      return response.status(404).send({ message: "User not found!" });
    }
    return response.status(200).json(user)
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message })
  }
});

// Route for Update User
router.put("/:id", async (request, response) => {
  try {
    if (!request.body.major || !request.body.student_id || !request.body.name || !request.body.date_of_birth || !request.body.sex || !request.body.study_program) {
      return response.status(400).send({ message: "Send all fields required" });
    }
    const { id } = request.params;
    const result = await User.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).send({ message: "User not found!" });
    }
    return response.status(200).send({ message: "User updated successfully" })
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message })
  }
});

// Route for Delete User and Account
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result1 = await User.findByIdAndDelete(id, request.body);
    const result2 = await Account.findOneAndDelete({user_id: id})
    if (!result1 || !result2) {
      return response.status(404).send({ message: "Something went wrong!" });
    }
    return response.status(200).send({ message: "User deleted successfully" })
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message })
  }
});

export default router;