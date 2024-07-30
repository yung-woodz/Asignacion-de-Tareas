import axios from './root.service.js';
// crear las tareas
export async function createTask(data) {
    try {
      const response = await axios.post('/works/task', data);
      return response.data;
    } catch (error) {
      throw new Error('Error en la creacion de Tarea');
    }
  }
// mostrar las tareas
  export async function getTasks() {
    try {
      const response = await instance.get('/works/tasks');
      return response.data;
    } catch (error) {
      throw new Error('No se han encontrado las Tareas');
    }
  }
  //mostrar el update
  export async function updateTask(data, _id) {
    try {
      const response = await axios.patch('/works/tasks/status?_id=${_id}', data);
      return response.data;
    } catch (error) {
      throw new Error('Error al Actualizar tarea');
    }
  }
// eliminar o cancelar
  export async function deleteTask(data) {
    try {
        const response = await axios.delete('/works/tasks/status/eliminar', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}