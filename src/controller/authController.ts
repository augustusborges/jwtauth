import { Request, Response, NextFunction } from "express"
import 'dotenv/config'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "../config/database"
import { UsuarioModel } from "../model/usuario"
//import auth from "../middleware/auth"

export class AuthController{

    async registrar(req: Request, res: Response){
        try {
            const { first_name, last_name, email, password } = req.body
        
            if (!(email && password && first_name && last_name)) {
              res.status(400).json({ status: "Error", mensagem: "Todos os dados devem ser fornecidos"})
            }
            const usuario = new UsuarioModel();
            const oldUser = await usuario.encontrarUsuarioPorEmail(email)
        
            if (oldUser) {
              return res.status(409).json({ status: "Error", mensagem: "O usuário ja é cadastrado no sistema. Por favor faça login"})
            }
        
            const encryptedPassword = await bcrypt.hash(password, 10)
        
            const user = await usuario.cadastraUsuario({
              first_name,
              last_name,
              email: email.toLowerCase(),
              password: encryptedPassword
            })
        
            const token = jwt.sign({ user_id: user._id, email }, "teste", {
              expiresIn: "2h"
            })
        
            user.token = token
        
            res.status(201).json(user)
          } catch (err: any) {
            res.status(500).json({ status: "Error", mensagem: err.message })
          }
    }

    async login(req: Request, res: Response, next: NextFunction){
        try {
            // Get user input
            const { email, password } = req.body
        
            // Validate user input
            if (!(email && password)) {
              res.status(400).send("All input is required")
            }
            // Validate if user exist in our database
            const usuario = new UsuarioModel();
            const user = await usuario.encontrarUsuarioPorEmail(email)
        
            if (user && (await bcrypt.compare(password, user.password))) {
              // Create token
              const token = jwt.sign({ user_id: user._id, email }, "teste", {
                expiresIn: "2h"
              })
        
              // save user token
              user.token = token
        
              // user
              res.status(200).json(user)
            }
            res.status(400).send("Invalid Credentials")
          } catch (err) {
            console.log(err)
          }
    }

    async welcome(req: Request, res: Response, next: NextFunction){
      console.log("teste")
      res.status(200).send("Welcome 🙌")
    }

}