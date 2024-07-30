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
      return res.status(404).json({ error: "Tareas no encontradas" });
    }else{
      res.status(200).json({
        message: "Lista de tareas: ",
        data: tasks
      });
    }

    


  } catch (error) {
    res.status(404).json({ error: "No hay tareas tareas" });
  }
};

// Actualizar una tarea
export async function updateTaskStatus (req, res) {
  
  try {

    const taskId = req.query._id;
    const { title, description, timeSpent } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (timeSpent !== undefined) task.timeSpent = timeSpent;

    await task.save();
    
    res.status(200).json({
      
      message: "Tarea actualizada exitosamente!",
      data: task

    });

  } catch (error) {
    console.log("Error en task.controller.js -> uptadateTask(): ", error);
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una tarea
export async function deleteTask(req, res) {
  try {
    const taskId= req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    await Task.findOneAndDelete(taskId);

    res.status(200).json({
      message: "Tarea eliminada exitosamente!",
      data: task
    });

  } catch (error) {
    console.log("Error en task.controller.js -> deleteTask(): ", error);
    res.status(500).json({ message: error.message });
  }
}


