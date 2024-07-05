import Task from "../models/task.model.js";
import User from "../models/user.model.js";

// Crear una nueva tarea
export async function createTask (req, res) {
  
  try {

    const { title, description, assignedTo, timeSpent } = req.body;

    const user = await User.findOne({rut: assignedTo});

    console.log(user);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const task = new Task({ 
      title,
      description,
      assignedTo: user._id,
      timeSpent
    });

    await task.save();

    res.status(201).json({
      message: "Tarea creada exitosamente!",
      data: task
    })


  } catch (error) {
    
    res.status(404).json({ error: "No se pudo asignar la tarea al usuario" });

  }
};

// Obtener todas las tareas
export async function getTasks (req, res) {
  try {
    const tasks = await Task.find();

    if (!tasks) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.status(200).json({
      message: "Lista de tareas: ",
      data: tasks
    });


  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar el estado de una tarea
export async function updateTaskStatus (req, res) {
  

  try {

    const { taskId, status, timeSpent } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.status = status;
    if (timeSpent) task.timeSpent = timeSpent;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
