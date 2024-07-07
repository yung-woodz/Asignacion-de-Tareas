"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Controlador de usuarios */
import {getUser, getUsers, updateUser, deleteUser} from "../controllers/user.controller.js";

/** Middlewares de autorización */
import { isAdmin,isAyudante,isDecano,authorizeRoles } from "../middlewares/auth.middleware.js";

// Se realiza una instancia de express
const router = Router();
router.use(authorizeRoles(isAdmin,isAyudante,isDecano))
// Define las rutas para los usuarios
router.get("/", getUsers);
router.get("/1",  getUser);
router.put("/",  updateUser);
router.delete("/",  deleteUser);

export default router;