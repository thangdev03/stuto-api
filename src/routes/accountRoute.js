import express from "express"
import { Account } from "../models/accountModel.js"

const router = express.Router();

// Route for Get all Account
router.get("/", async (request, response) => {
  try {
    const accounts = await Account.find({});
    return response.status(200).json({
      data: accounts
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
})

export default router;