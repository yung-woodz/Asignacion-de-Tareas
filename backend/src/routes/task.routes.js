"use strict"

import { Router } from "express";

import { createTask, getTasks, updateTaskStatus, deleteTask } from "../controllers/task.controller.js";
//const { protect, admin } = require('../middleware/auth.middleware.js');
import { isAdmin, isDecano, isAyudante, authorizeRoles } from "../middlewares/auth.middleware.js";
const router = Router();

router.use(authorizeRoles(isAdmin,isAyudante,isDecano))

router.post('/task', createTask);
router.get('/tasks', getTasks);
router.patch('/tasks/status/:id', updateTaskStatus);
router.delete('/tasks/status/eliminar/:id', deleteTask);


export default router;
