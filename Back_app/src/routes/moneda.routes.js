import { Router } from "express";
import Moneda from "../controllers/moneda.controller.js";


const router = Router()

router.get("/Monedas",Moneda.getMonedas)

router.get("/Monedas/:id", Moneda.getMonedasId)

router.post("/Monedas",Moneda.postMonedas)

router.put("/Monedas")

router.delete("/Monedas")




export default router