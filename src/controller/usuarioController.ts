import { Request, Response, NextFunction } from "express"
import { Usuario } from "../model/usuario"
import { user } from "../../src/@types/@userTypes"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const usuario = new Usuario()

async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { first_name, last_name, email, password } = req.body

    if (!(email && password && first_name && last_name)) {
      res.status(400).send("Todos os dados devem ser fornecidos")
    }

    const oldUser = await usuario.encontrarUsuarioPorEmail(email)
    if (oldUser) {
      return res.status(409).send("Usuário já cadastrado no sistema. Por favor faça login")
    }

    const encryptedPassword = await bcrypt.hash(password, 10)

    const novoUsuario = await usuario.cadastraUsuario({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword
    })

    const token = jwt.sign({ user_id: novoUsuario.id, email }, process.env.TOKEN_KEY as string, {
      expiresIn: "2h"
    })

    novoUsuario.token = token

    res.status(201).json(novoUsuario)
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
    const usuarioCadastrado = await usuario.encontrarUsuarioPorEmail(email)

    if (usuarioCadastrado && (await bcrypt.compare(password, usuarioCadastrado.password as string))) {
      const token = jwt.sign({ user_id: usuarioCadastrado.id, email }, process.env.TOKEN_KEY as string, {
        expiresIn: "2h"
      })

      usuarioCadastrado.token = token

      res.status(200).json(usuarioCadastrado)
    }
    res.status(400).send("Credenciais invalidas. Acesso negado")
  } catch (err) {
    console.log(err)
  }
}

async function listarUsuarios(req: Request, res: Response, next: NextFunction) {
  await usuario.listaUsuarios()

  res.status(200).send("Acima os usuarios cadastrados no sistema")
}

async function cadastrarUsuario(req: Request, res: Response, next: NextFunction) {
  res.status(200).send("Usuario cadastrado no sistema")
}

export default { registerUser, login, listarUsuarios, cadastrarUsuario }
