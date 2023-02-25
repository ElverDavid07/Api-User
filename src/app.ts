import "dotenv/config"
import cors from 'cors'
import express from 'express'
import routerUser from './routes/user'
import morgan from 'morgan'
import helmet from 'helmet'
import { connectdb } from "./config/connectMongodb"

const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())
app.use("/api",routerUser)
connectdb()

app.listen(PORT,()=>console.log(`run in http://localhost:${PORT}`))