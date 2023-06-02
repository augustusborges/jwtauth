const app = require("../app.js")
const request = require("supertest")

let server
beforeEach(() => {
  const port = 3000
  server = app.listen(port)
})

afterEach(() => {
  server.close()
})

describe("POST login", () => {
  it("Deve retornar os dados de login do usuario", async () => {
    await request(app).post("/login").send({ email: "marciarenata@gmail.com", password: "Renata0607" }).expect(200)
  })
})
