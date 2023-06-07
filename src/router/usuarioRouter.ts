import express from "express"
import userController from "../controller/userController"

const router = express.Router()

router.post("/v1.0/api/usuarios", userController.listarUsuarios)
router.post("/v1.0/api/usuarios/cadastra", userController.cadastraUsuario)

export default router
