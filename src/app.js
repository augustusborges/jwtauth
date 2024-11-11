import "dotenv/config"
import express from "express"
import cors from 'cors'
import authRouter from './routes/authRoutes.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(authRouter)



export default app
