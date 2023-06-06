import express from "express"
import livroController from "../controller/livroController"

const router = express.Router()

router.get("/v1.0/api/livro/", livroController.listaLivros)
router.post("/v1.0/api/livro/", livroController.cadastraLivros)

export default router
