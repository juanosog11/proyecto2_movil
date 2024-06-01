import { Router } from "express";
import {
  getUsuarios_acc,
  getUsuario_acc,
  createUsuarios_acc,
  updateUsuarios_acc,
  deleteUsuarios_acc,
} from '../controllers/empoyees.controlles.js';


const router = Router();

router.get('/Pais', getUsuarios_acc);

router.get('/Pais/:id', getUsuario_acc);

router.post('/Pais', createUsuarios_acc);

router.patch('/Pais/:id', updateUsuarios_acc);

router.delete('/Pais/:id', deleteUsuarios_acc);

export default router;