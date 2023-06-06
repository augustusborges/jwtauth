import express from "express"
import userController from "../controller/userController"

const router = express.Router()

router.post("/v1.0/api/", userController.registerUser)
router.post("/v1.0/api/login", userController.login)

export default router
