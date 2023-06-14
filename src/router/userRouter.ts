import express from "express"
import userController from "../controller/userController"

const userRouter = express.Router()

userRouter.route("/v1.0/api/user/").post(userController.registerUser)

userRouter.route("/v1.0/api/user/login/").post(userController.login)

export default userRouter
