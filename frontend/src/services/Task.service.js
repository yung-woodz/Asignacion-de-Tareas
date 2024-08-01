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
      const response = await axios.get('/works/tasks');
      console.log("este es el get",response);
      return response.data;
    } catch (error) {
      throw new Error('No se han encontrado las Tareas');
    }
  }
  //mostrar el update
  export async function updateTask(data, _id) {
    try {
      const response = await axios.patch(`/works/tasks/status/${_id}`, data);
      return response.data;
    } catch (error) {
      throw new Error('Error al Actualizar tarea');
    }
  }
  
  export async function deleteTask(_id) {
    try {
      console.log("hola",_id);
      await axios.delete(`/works/tasks/status/eliminar/${_id}`);

    } catch (error) {
        throw error.response?.data || error.message;
    }
}
  