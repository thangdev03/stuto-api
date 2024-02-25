import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Account } from "../models/accountModel.js"
import { User } from "../models/userModel.js"

const router = express.Router();

// Route for Login Validation
router.post('/login', async (request, response) => {
  const account = await Account.findOne({
    email: request.body.email
  });
  
  if (!account) {
    return response.status(404).send({ message: "Email not found" });
  }
  
  const user = await User.findOne({
    _id: account.user_id
  });

  if (!user) {
    return response.status(404).send({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(
    request.body.password,
    account.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        email: account.email,
        name: user.name,
        major: user.major,
        date_of_birth: user.date_of_birth,
        sex: user.sex,
        location: user.location,
        avatar: user.avatar,
        study_program: user.study_program
      },
      'secret123'
    );
    const result = await User.findByIdAndUpdate(
      {
        _id: user._id
      },
      {
        $set: {
          is_active: true
        }
      } 
    );
    result? console.log("update success", result) : console.log("update failed")
    return response.status(200).json({ token: token, name: user.name, role: account.role })
  } else {
    return response.status(404).json({ token: false })
  }
});


export default router;