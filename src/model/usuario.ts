import { PrismaClient } from "@prisma/client"
import { user } from "../../src/@types/@userTypes"

const prisma = new PrismaClient()

export class Usuario {
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

  async cadastraUsuario(usuario: user): Promise<user> {
    try {
      await prisma.$connect()
      await prisma.users.create({
        data: {
          first_name: usuario.first_name,
          last_name: usuario.last_name,
          email: usuario.email,
          password: usuario.password,
          token: ""
        }
      })
      const novoUsuario = await this.encontrarUsuarioPorEmail(usuario.email)
      await prisma.$disconnect()
      return novoUsuario
    } catch (err) {
      console.error(err)
      await prisma.$disconnect()
      process.exit(1)
    }
  }

  async encontrarUsuarioPorEmail(email: string): Promise<user> {
    const usuario: user = (await prisma.users.findUnique({ where: { email } })) as user
    return usuario
  }
}
