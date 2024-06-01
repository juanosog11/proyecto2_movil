import { Router } from "express";

import { createPais, deletePais, getPais, getPaises, updatePais } from '../controllers/empoyees.controlles.js';

const router = Router();

router.get('/Pais', getPaises);

router.get('/Pais/:id', getPais);

router.post('/Pais', createPais);

router.patch('/Pais/:id', updatePais);

router.delete('/Pais/:id', deletePais);

export default router;