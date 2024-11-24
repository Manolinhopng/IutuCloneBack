import express from "express";
import { login } from "../controllers/login.controller.js";
import { register } from "../controllers/register.controller.js";
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post("/register", register);

// Ruta para iniciar sesión
router.post("/login", login);

export default router;
