import express from "express"
import mongoose from "mongoose"
import { Wish } from "../models/wishModel.js";

const router = express.Router();

// Save new wish
router.post("/", async (request, response) => {
    try {
        const {user_id, description, is_active} = request.body;
        const newWish = new Wish({
            user_id,
            description,
            is_active
        })
        const savedWish = await newWish.save();
        if (!savedWish) {
            response.status(501).send({ message: "Save new wish failed!" })
        }
        response.status(201).json(savedWish);
    } catch (error) {
        response.status(500).send({ message: error.message })
    }
})

// Get wish of an user
router.get("/:userId", async (request, response) => {
    try {
        const { userId } = request.params;
        const ObjectId = mongoose.Types.ObjectId;
        const wish = await Wish.findOne({
            user_id: new ObjectId(userId)
        });
        response.status(200).json(wish)
    } catch (error) {
        response.status(500).send({ message: error.message })        
    }
})

// Update wish
router.put("/:wishId", async (request, response) => {
    try {
        const { wishId } = request.params;
        const { description, is_active } = request.body;
        const updatedWish = await Wish.findByIdAndUpdate(wishId, {
            $set: {
                description,
                is_active
            }
        })
        if (!updatedWish) {
            response.status(400).send({ message: "Update Wish failed" })
        }
        response.status(200).send({ message: "Update Wish successfully!" })
    } catch (error) {
        response.status(500).send({ message: error.message })        
    }
})

// Delete wish
router.delete("/:wishId", async (request, response) => {
    try {
        const { wishId } = request.params;
        const deletedWish = await Wish.findByIdAndDelete(wishId);
        if (!deletedWish) {
            response.status(400).send({ message: "Delete Wish failed" })
        }
        response.status(200).send({ message: "Delete Wish successfully!" })
    } catch (error) {
        response.status(500).send({ message: error.message })        
    }
})

export default router