import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import userRouter from "./router/userRouter"
import livroRouter from "./router/livroRouter"

const app = express()
app.use(morgan("tiny"))
app.use(cors())
app.use(helmet())
app.use(express.json())

app.use(userRouter)
app.use(livroRouter)

export default app
