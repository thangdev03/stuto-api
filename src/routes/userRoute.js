import express from "express"
import bcrypt from "bcryptjs"
import { User } from "../models/userModel.js"
import { Account } from "../models/accountModel.js";
import { Major } from "../models/majorModel.js";

const router = express.Router();

// Route for Create new User and Account
router.post("/register", async (request, response) => {
  try {
      if (!request.body) {
          return response.status(400).send({ message: "Send all fields required" });
      }
      const existingEmail = await Account.findOne({email: request.body.email});
      if (existingEmail) {
        return response.status(400).send({ message: "Email này đã tồn tại, vui lòng kiểm tra lại" })
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
      
      return response.status(201).send({ message: "Tạo tài khoản thành công" });
  } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
  }
});

// Route for Get all User
router.get("/", async (request, response) => {
  try {
    const usersList = await User.find({});
    const users = []
    for (const index in usersList) {
      const account = await Account.findOne({user_id: usersList[index].id})
      if (account.role === "client") {
        users.push({
          info: usersList[index],
          email: account.email,
          is_restricted: account.is_restricted
        })
      } 
    }
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
    const user = await User.findById(id).populate("major");
    // const majorOfUser = await Major.findById(await user.major); //Sửa lại dùng populate
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
    const query = {
      major: request.body.major,
      student_id: request.body.student_id,
      name: request.body.name,
      date_of_birth: request.body.date_of_birth,
      sex: request.body.sex,
      location: request.body.location,
      avatar: request.body.avatar,
      study_program: request.body.study_program
    }
    const { id } = request.params;
    const result = await User.findByIdAndUpdate(id, {$set: query});
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