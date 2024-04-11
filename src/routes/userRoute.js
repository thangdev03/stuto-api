import express from "express"
import bcrypt from "bcryptjs"
import { User } from "../models/userModel.js"
import { Account } from "../models/accountModel.js";
import { Message } from "../models/messageModel.js";
import { Conversation } from "../models/conversationModel.js";

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
    const usersList = await User.find({}).populate("major")
    .populate({
      path: "wish",
      populate: {
        path: "subject",
        model: "Subject"
      }
    });
    const users = []
    for (const index in usersList) {
      const account = await Account.findOne({user_id: usersList[index].id});
      if (account && account.role === "client") {
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
    const user = await User.findById(id)
    .populate("major")
    .populate({
      path: "wish",
      populate: {
        path: "subject",
        model: "Subject"
      }
    });
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
    // if (!result) {
    //   return response.status(404).send({ message: "User not found!" });
    // }
    return response.status(200).send({ message: "User updated successfully" })
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message })
  }
});

// Route for Update User's Wish
router.put("/:userId/wish", async (request, response) => {
  try {
      const { userId } = request.params;
      const { subject, description, is_active } = request.body;
      const updatedUser = await User.findByIdAndUpdate(userId, {
          $set: {
            wish: {$set: {
              subject,
              description,
              is_active
            }}
          }
      })
      if (!updatedUser) {
          response.status(400).send({ message: "Update Wish failed" })
      }
      response.status(200).send({ message: "Update Wish successfully!" })
  } catch (error) {
      response.status(500).send({ message: error.message })        
  }
})

// Route for Delete User and Account
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result1 = await User.findByIdAndDelete(id);
    const result2 = await Account.findOneAndDelete({user_id: id})
    const result3 = await Message.deleteMany({sender: id});
    const result4 = await Conversation.deleteMany({members: {$in: [id]}});
    if (!result1 || !result2 || !result3 || !result4) {
      return response.status(404).send({ message: "Something went wrong!" });
    }
    return response.status(200).send({ message: "User deleted successfully" })
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message })
  }
});

export default router;