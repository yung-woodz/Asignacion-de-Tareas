"use strict"

import { Router } from "express";

import { createTask, getTasks, updateTaskStatus } from "../controllers/task.controller.js";
//const { protect, admin } = require('../middleware/auth.middleware.js');
import { isAdmin } from "../middlewares/auth.middleware.js";
const router = Router();

router.post('/tasks', isAdmin, createTask);
router.get('/tasks', isAdmin, getTasks);
router.patch('/tasks/status', isAdmin, updateTaskStatus);

export default router;
