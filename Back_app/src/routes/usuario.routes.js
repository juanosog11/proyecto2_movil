import { Router } from 'express';
import {
  getUsuarios,
  getUsuario,
  createUsuarios,
  updateUsuario,
  deleteUsuario,
  getUsuarioCoreo,
} from '../controllers/usurio.controller.js';

const router = Router();

router.get('/Usuario', getUsuarios);

router.get('/Usuario/:id', getUsuario);

router.get('/Usuario/:correo/:contrasena', getUsuarioCoreo);

router.post('/Usuario', createUsuarios);

router.patch('/Usuario/:id', updateUsuario);

router.delete('/Usuario:id', deleteUsuario);

export default router;