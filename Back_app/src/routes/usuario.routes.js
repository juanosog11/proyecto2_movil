import { Router } from 'express';
import {
  getUsuarios,
  getUsuario,
  createUsuarios,
  updateUsuario,
  deleteUsuario,
} from '../controllers/empoyees.controlles.js';

const router = Router();

router.get('/Usuario', getUsuarios);

router.get('/Usuario/:id', getUsuario);

router.post('/Usuario', createUsuarios);

router.patch('/Usuario/:id', updateUsuario);

router.delete('/Usuario:id', deleteUsuario);

export default router;