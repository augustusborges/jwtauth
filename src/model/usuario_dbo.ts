import { PrismaClient } from "@prisma/client"
import { user, usuario } from "../../src/@types/@userTypes"

const prisma = new PrismaClient()

export class Usuario {
  async listaUsuarios() {
    try {
      const allUsers = await prisma.usuario.findMany()
      console.log(allUsers)
    } catch (err) {
      console.error(err)
      process.exit(1)
    } finally {
      await prisma.$disconnect()
    }
  }

  // async cadastraUsuario(usuario: usuario): Promise<usuario> {
  //   try {
  //     const novoUsuario = (await prisma.usuario.create({
  //       data: {
  //         nome: usuario.nome,
  //         sobrenome: usuario.sobrenome,
  //         email: usuario.email,
  //         senha: usuario.senha,
  //         token: ""
  //       },
  //     }))
  //     return novoUsuario
  //   } catch (err) {
  //     console.error(err)
  //     process.exit(1)
  //   }finally{
  //       await prisma.$disconnect()
  //   }
  // }

  async encontrarUsuarioPorEmail(email: string): Promise<user> {
    const usuario: user = (await prisma.users.findUnique({ where: { email } })) as user
    return usuario
  }
}
