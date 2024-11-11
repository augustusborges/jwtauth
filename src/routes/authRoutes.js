import express, { Router } from 'express'
import { AuthController } from '../controller/authController.js'

const authRouter = Router()

const authController = new AuthController()

authRouter.post('/auth', authController.registrar)
authRouter.post('/login', authController.login)
authRouter.get('/welcome', authController.welcome)

export default authRouter