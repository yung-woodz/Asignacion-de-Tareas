import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['completo', 'incompleto'],
      default: 'incompleto',
    },
    assignedTo: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    timeSpent: {
      type: Number, // Tiempo en minutos
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }  
);

const Task = mongoose.model("Task", taskSchema);

export default Task;