import express from "express"
import userController from "../controller/userController"

const router = express.Router()

router.post("/", userController.registerUser)

export default router
