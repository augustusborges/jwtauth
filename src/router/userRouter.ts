import express from "express"
import {UsuarioController} from "../controller/usuarioController"
//import verifyToken from "../middleware/auth"

const userRouter = express.Router()
const usuarioController = new UsuarioController() 
userRouter.route("/v1.0/api/user/login/").post(usuarioController.login)

//userRouter.use(verifyToken)



export default userRouter
