import { Request, Response, NextFunction } from "express"
import { UsuarioModel } from "../model/usuario"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class UsuarioController{
usuario: UsuarioModel

constructor(){
  this.usuario = new UsuarioModel()}

async registrar(req: Request, res: Response, next: NextFunction) {
  try {
    const { first_name, last_name, email, password } = req.body

    if (!(email && password && first_name && last_name)) {
      res.status(400).send("Todos os dados devem ser fornecidos")
    }

    const oldUser = await this.usuario.encontrarUsuarioPorEmail(email)
    if (oldUser) {
      return res.status(409).send("Usuário já cadastrado no sistema. Por favor faça login")
    }

    const encryptedPassword = await bcrypt.hash(password, 10)

    const novoUsuario = await this.usuario.cadastraUsuario({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword
    })

    const token = jwt.sign({ user_id: novoUsuario._id, email }, process.env.TOKEN_KEY as string, {
      expiresIn: "2h"
    })

    novoUsuario.token = token

    res.status(201).json(novoUsuario)
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: "Error", mensagem: err })
  }
}

async login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body

    if (!(email && password)) {
      res.status(400).send("É obrigatorio informar login e senha")
    }
    const usuarioCadastrado = await this.usuario.encontrarUsuarioPorEmail(email)

    if (usuarioCadastrado && (await bcrypt.compare(password, usuarioCadastrado.password as string))) {
      const token = jwt.sign({ user_id: usuarioCadastrado._id, email }, process.env.TOKEN_KEY as string, {
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

async listarUsuarios(req: Request, res: Response, next: NextFunction) {
  await this.usuario.listaUsuarios()

  res.status(200).send("Acima os usuarios cadastrados no sistema")
}

async cadastrarUsuario(req: Request, res: Response, next: NextFunction) {
  res.status(200).send("Usuario cadastrado no sistema")
}

} 
