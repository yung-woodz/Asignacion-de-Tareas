"use strict"

import { Router } from "express";

import { createTask, getTasks, updateTaskStatus, deleteTask } from "../controllers/task.controller.js";
//const { protect, admin } = require('../middleware/auth.middleware.js');
import { isAdmin } from "../middlewares/auth.middleware.js";
const router = Router();

router.post('/task', isAdmin, createTask);
router.get('/tasks', isAdmin, getTasks);
router.patch('/tasks/status', isAdmin, updateTaskStatus);
router.delete('/tasks/status/eliminar', isAdmin, deleteTask);


export default router;
