import express from "express"
import morgan from "morgan"
import router from "./routes/personajes.routes.js"
import cors from 'cors'

const app = express()

//puerto 
app.set("port", process.env.PORT || 3000)

//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors(
    {
        origin: "http://localhost:8081",
        credentials: true
    }
))


//routes
app.use(router)



export default app;
