// src/routes/llantaRoutes.js
import { Router } from "express";
import {
  getAllLlantas,
  renderNuevaLlanta,
  createLlanta,
  renderEditarLlanta,
  updateLlanta,
  deleteLlanta
} from "../controllers/productoController.js";

const router = Router();

router.get("/", getAllLlantas);
router.get("/new", renderNuevaLlanta);
router.post("/", createLlanta);
router.get("/:id/edit", renderEditarLlanta);
router.put("/:id", updateLlanta);           // usa method-override
router.delete("/:id", deleteLlanta);        // usa method-override

export default router;
