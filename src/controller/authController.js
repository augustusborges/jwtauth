//import Request from 'express';
//import Response from 'express';
import "../config/database.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../model/user.js"
import auth from "../middleware/auth.js"

export class AuthController{


    async registrar(req, res){
        try {
            const { first_name, last_name, email, password } = req.body
        
            if (!(email && password && first_name && last_name)) {
              res.status(400).json({ status: "Error", mensagem: "Todos os dados devem ser fornecidos"})
            }
        
            const oldUser = await User.findOne({ email })
        
            if (oldUser) {
              return response.status(409).json({ status: "Error", mensagem: "O usuário ja é cadastrado no sistema. Por favor faça login"})
            }
        
            encryptedPassword = await bcrypt.hash(password, 10)
        
            const user = await User.create({
              first_name,
              last_name,
              email: email.toLowerCase(),
              password: encryptedPassword
            })
        
            const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
              expiresIn: "2h"
            })
        
            user.token = token
        
            res.status(201).json(user)
          } catch (err) {
            res.status(500).json({ status: "Error", mensagem: err.message })
          }
    }

    async login(request, response){
        try {
            // Get user input
            const { email, password } = req.body
        
            // Validate user input
            if (!(email && password)) {
              res.status(400).send("All input is required")
            }
            // Validate if user exist in our database
            const user = await User.findOne({ email })
        
            if (user && (await bcrypt.compare(password, user.password))) {
              // Create token
              const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
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

    welcome(request, response){
      console.log("teste")
      response.status(200).send("Welcome 🙌")
    }

}