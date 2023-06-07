import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class Usuarios {
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

  async cadastraUsuario() {
    try {
      await prisma.$connect()
      await prisma.users.create({
        data: {
          first_name: "Alexa",
          last_name: "Borges",
          email: "alexa@gmail.com",
          password: "123456",
          token: ""
        }
      })
      const allUsers = await prisma.users.findMany()
      console.log(allUsers)
      await prisma.$disconnect()
    } catch (err) {
      console.error(err)
      await prisma.$disconnect()
      process.exit(1)
    }
  }
}
