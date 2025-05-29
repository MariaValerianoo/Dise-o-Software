// src/routes/index.js
import { Router } from "express";
import { renderDashboard } from '../controllers/dashboardController.js';

const router = Router();

// sustituye la línea estática:
// router.get('/', (req, res) => res.render('index'));
// por esta:
router.get('/', renderDashboard);

router.get('/about', (req, res) => res.render('about'));
router.get('/contact', (req, res) => res.render('contact'));

export default router;