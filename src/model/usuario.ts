import { PrismaClient } from "@prisma/client"
import { usuario } from "../@types/@usuarioTypes"

const prisma = new PrismaClient()

export class UsuarioModel {
  async listaUsuarios() {
    try {
      await prisma.$connect()
      const allUsers = await prisma.users.findMany()
      console.log(allUsers)
      await prisma.$disconnect()
    } catch (err) {
      console.error(err)
      await prisma.$disconnect()
      process.exit(1)
    }
  }

  async cadastraUsuario(usuario: usuario): Promise<usuario> {
    try {
      await prisma.$connect()
      const novoUsuario = (await prisma.users.create({
        data: {
          first_name: usuario.first_name,
          last_name: usuario.last_name,
          email: usuario.email,
          password: usuario.password,
          token: ""
        }
      })) as usuario
      await prisma.$disconnect()
      return novoUsuario
    } catch (err) {
      console.error(err)
      await prisma.$disconnect()
      process.exit(1)
    }
  }

  async encontrarUsuarioPorEmail(email: string): Promise<usuario> {
    const usuario: usuario = (await prisma.users.findUnique({ where: { email } })) as usuario
    return usuario
  }
}
