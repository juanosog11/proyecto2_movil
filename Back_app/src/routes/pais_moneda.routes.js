import { Router } from "express";
import Moneda_pais from "../controllers/pais_moneda.controller,js";


const router = Router()

router.get("/Monedas", Moneda.getMonedas)

router.get("/Monedas/:id", Moneda.getMonedasId)

router.post("/Monedas", Moneda.postMonedas)

router.patch("/Monedas/:id", Moneda.patchMonedas)

router.delete("/Monedas/:id", Moneda.DeleteMonedas)




export default router