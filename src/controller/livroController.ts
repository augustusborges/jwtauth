import { Request, Response, NextFunction } from "express"
import { User } from "../model/user"
import bcrypt from "bcrypt"
import jwt, { Secret, JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
import { MongoConnection } from "../config/database"

dotenv.config()
MongoConnection.connect()

async function listaLivros(req: Request, res: Response, next: NextFunction) {
  console.log("lista de livros")
  res.status(200).send("lista de livros")
}

async function cadastraLivros(req: Request, res: Response, next: NextFunction) {
  console.log("cadastro de Livros")
  res.status(200).send("cadastro de Livros")
}

export default { listaLivros, cadastraLivros }
