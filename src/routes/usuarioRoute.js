import { Router } from "express";
import {
  obtenerUsuarios,       // GET  /usuarios
  renderNuevoUsuario,    // GET  /usuarios/new
  crearUsuario,          // POST /usuarios
  renderEditarUsuario,   // GET  /usuarios/:id/edit
  actualizarUsuario,     // PUT  /usuarios/:id
  borrarUsuario          // DELETE /usuarios/:id
} from "../controllers/usuarioController.js";

const router = Router();

// Listar usuarios
router.get("/", obtenerUsuarios);

// Mostrar formulario de creación
router.get("/new", renderNuevoUsuario);

// Procesar creación
router.post("/", crearUsuario);



// Mostrar formulario de edición
router.get("/:id/edit", renderEditarUsuario);

// Procesar actualización
router.post("/:id", actualizarUsuario);

// Procesar borrado
router.delete("/:id", borrarUsuario);

export default router;