import Navbar from "../components/Navbar.jsx";
import { createTask } from '../services/task.service.js';
import FormTask from "../components/FormTarea.jsx";

const TaskAd = () => {
  // Define los campos del formulario
  
  const fields = [
  { name: 'title', placeholder: 'Título de la tarea', required: true }, 
  { name: 'description', placeholder: 'Descripción de la tarea', type: 'text' },
  { name: 'assignedTo', placeholder: 'Asignado a (RUT)', required: true }, 
  { name: 'timeSpent', placeholder: 'Tiempo dedicado (minutos)', type: 'number' } 
  ];

  // Maneja el envío del formulario
  const EnviarTarea = async (data) => {
    try {
      await createTask(data);
      alert('Tarea creada exitosamente!');
    } catch (error) {
      alert('Error al crear la tarea ');
    }
  };
// cambiar cosas aca
  return (
    <>
     <Navbar />
    <div>
    <div className="form">
      <FormTask
        title="Crear Nueva Tarea"
        fields={fields}
        buttonText="Crear Tarea"
        onSubmit={EnviarTarea}
        backgroundColor="#FFFFFF" 
      />
      </div>
    </div>
    </>
  );
};

export default TaskAd;
