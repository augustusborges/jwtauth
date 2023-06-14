import express from "express"
import livroController from "../controller/livroController"

const livroRouter = express.Router()

livroRouter.route("/v1.0/api/livro/").get(livroController.listaLivros).post(livroController.cadastraLivros)

export default livroRouter
