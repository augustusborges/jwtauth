import { Request, Response, NextFunction } from "express"
import { User } from "../model/user"
import bcrypt from "bcrypt"
import jwt, { Secret, JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
import { MongoConnection } from "../config/database"
import { Usuarios } from "../model/usuarios"
dotenv.config()
MongoConnection.connect()

async function registerUser(req: Request, res: Response, next: NextFunction) {
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

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body

    if (!(email && password)) {
      res.status(400).send("É obrigatorio informar login e senha")
    }

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password as string))) {
      const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY as string, {
        expiresIn: "2h"
      })

      // save user token
      user.token = token

      // user
      res.status(200).json(user)
    }
    res.status(400).send("Credenciais invalidas. Acesso negado")
  } catch (err) {
    console.log(err)
  }
}

async function listarUsuarios(req: Request, res: Response, next: NextFunction) {
  const usuarios = new Usuarios()

  await usuarios.listaUsuarios()

  res.status(200).send("Acima os usuarios cadastrados no sistema")
}

async function cadastraUsuario(req: Request, res: Response, next: NextFunction) {
  const usuarios = new Usuarios()

  await usuarios.cadastraUsuario()

  res.status(200).send("Usuario cadastrado no sistema")
}

export default { registerUser, login, listarUsuarios, cadastraUsuario }
