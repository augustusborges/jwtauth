import express, { Router } from 'express'
import { AuthController}  from '../controller/authController'
import { UsuarioController } from '../controller/usuarioController'

const authRouter = Router()

const authController = new AuthController()
const usuarioController = new UsuarioController()

//authRouter.post('/auth', authController.registrar)
authRouter.post('/login', authController.login)
authRouter.get('/welcome', authController.welcome)

export default authRouter