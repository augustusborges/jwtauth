import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { encode, TAlgorithm } from "jwt-simple"

const config = process.env

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.headers["x-access-token"] as string

  if (!token) {
    return res.status(403).send("O token informado é invalido")
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY as jwt.Secret)
    req.body.user = await jwt.decode(token)
  } catch (err) {
    return res.status(401).send("Token invalido")
  }
  return next()
}

export default verifyToken
