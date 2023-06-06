import { Request, Response, NextFunction } from "express"
import { User } from "../model/user"
import bcrypt from "bcrypt"
import jwt, { Secret, JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
import { MongoConnection } from "../config/database"

dotenv.config()
MongoConnection.connect()

async function registerUser(req: Request, res: Response, next: NextFunction) {
  console.log("No registro")
  try {
    const { first_name, last_name, email, password } = req.body

    if (!(email && password && first_name && last_name)) {
      res.status(400).send("Todos os dados devem ser fornecidos")
    }

    const oldUser = await User.findOne({ email })
    if (oldUser) {
      return res.status(409).send("Usuário já cadastrado no sistema. Por favor faça login")
    }

    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword
    })

    const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY as string, {
      expiresIn: "2h"
    })

    user.token = token

    res.status(201).json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: "Error", mensagem: err })
  }
}

export default { registerUser }
