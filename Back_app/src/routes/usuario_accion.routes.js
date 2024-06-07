import { Router } from "express";
import {
  getUsuarios_acc,
  getUsuario_acc,
  createUsuarios_acc,
  updateUsuarios_acc,
  deleteUsuarios_acc,
  getUsuario_acc_user,
  getUsuario_acc_can,
} from '../controllers/usuario_accion.controller.js';


const router = Router();

router.get('/UsuarioAccion', getUsuarios_acc);

router.get('/UsuarioAccionCan/:usuario_id', getUsuario_acc_can);

router.get('/UsuarioAccion/:id', getUsuario_acc);

router.get('/UsuarioAccionUser/usuario/:id', getUsuario_acc_user);

router.post('/UsuarioAccion', createUsuarios_acc);

router.patch('/UsuarioAccion/:id', updateUsuarios_acc);

router.delete('/UsuarioAccion/:id', deleteUsuarios_acc);

export default router;