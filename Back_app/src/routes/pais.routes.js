import { Router } from "express";

import { createPais, deletePais, getPais, getPaises, updatePais, getPaisnom } from '../controllers/pais.controllers.js';

const router = Router();

router.get('/Pais', getPaises);

router.get('/Pais/:id', getPais);

router.post('/Pais', createPais);

router.patch('/Pais/:id', updatePais);

router.delete('/Pais/:id', deletePais);

router.get('/Paisn/:nombre', getPaisnom);

export default router;