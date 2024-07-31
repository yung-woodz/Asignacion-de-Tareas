import axios from './root.service.js';

export async function createTask(data) {

    try {
        const response = await axios.post('/works/task', data);

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function getTasks() {
    try {
        const { data } = await axios.get('/works/tasks');
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function updateTask(data, _id) {
    try {
        const response = await axios.patch(`/works/tasks/status?_id=${_id}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function deleteTask(_id) {
    try {
        const response = await axios.delete('/works/tasks/status/eliminar', { data: { _id } });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}