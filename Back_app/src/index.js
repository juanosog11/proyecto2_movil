import express from "express";
import index from "./routes/index.routes.js"
import Monedas from "./routes/moneda.routes.js";


const app = express()

app.listen(3001)
console.log("servidor corriendo en el puerto 3001")
app.use(express.json())

app.use(index)
app.use(Monedas)


app.use((req,res, next)=> {
    res.status(404).json({
        message: "endpoint not found o url no es correcta"
    })

})