import { Router } from "express";
import Moneda_pais from "../controllers/pais_moneda.controller.js";


const router = Router()

router.get("/Moneda_pais", Moneda_pais.getPaisMoneda)

router.get("/Moneda_pais:id", Moneda_pais.getPaisMonedaId)

router.post("/Moneda_pais", Moneda_pais.postPaisMoneda)

router.patch("/Moneda_pais/:id", Moneda_pais.patchPaisMoneda)

router.delete("/Moneda_pais/:id", Moneda_pais.DeletePaisMoneda)




export default router