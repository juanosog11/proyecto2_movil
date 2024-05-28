import { Router } from "express";
import { personajesController as pscontroller } from "../controllers/personajes.controller.js";

const router = Router()

router.get('/personajes', pscontroller.getPersoanjes)

router.get('/naves', pscontroller.getNaves)

export default router