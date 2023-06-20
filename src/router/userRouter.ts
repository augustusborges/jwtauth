import express from "express"
import userController from "../controller/usuarioController"
import verifyToken from "../middleware/auth"
const userRouter = express.Router()

userRouter.route("/v1.0/api/user/login/").post(userController.login)

userRouter.use(verifyToken)

userRouter.route("/v1.0/api/user/").post(userController.registerUser)

export default userRouter
