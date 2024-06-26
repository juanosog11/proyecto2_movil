import express from "express";
import index from "./routes/index.routes.js"
import Monedas from "./routes/moneda.routes.js";
import Pais from "./routes/pais.routes.js";
import Usuario from "./routes/usuario.routes.js"
import Usuarioacc from "./routes/usuario_accion.routes.js"
import cors from 'cors';
import PaisMoneda from "./routes/pais_moneda.routes.js";

const app = express()

app.listen(3001, () => {
    console.log("Servidor corriendo en el puerto 3001");
});

// Middleware
app.use(express.json())
app.use(cors());

// Registrar las rutas
app.use(index)
app.use(Monedas)
app.use(PaisMoneda)
app.use(Pais)
app.use(Usuario)
app.use(Usuarioacc)


app.use((req,res, next)=> {
    res.status(404).json({
        message: "endpoint not found o url no es correcta"
    })

})