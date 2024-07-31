import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getUsers } from '../services/user.service.js';
import { getTasks, deleteTask } from '../services/task.service';
import searchIcon from '../assets/searchIcon.svg';
import TableTask from '../components/TableTask';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const columns = ['Tarea', 'Descripcion', 'Estado', 'Asignado', 'Tiempo', 'Acción'];

  const dataTask = async () => {
    try {
      const response = await getTasks();
      const usersResponse = await getUsers();
      const usersData = usersResponse.data;
      
      const formattedData = response.data.map(task => {
        const assignedUser = usersData.find(user => user._id === task.assignedTo);
        return {
          _id: task._id,
          Tarea: task.title,
          Descripcion: task.description,
          Estado: task.status,
          Asignado: assignedUser ? assignedUser.rut : 'No asignado',
          Tiempo: task.timeSpent
        };
      });
      setTasks(formattedData);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await deleteTask(_id);
      setTasks(tasks.filter(task => task._id !== _id));
      console.log(tasks);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleEdit = (_id) => {
    const task = tasks.find(t => t._id === _id);
    navigate(`/edit-task/${_id}`, { state: { task } });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dataTask();
  }, []);

  const filteredTasks = tasks.filter(task =>
    task.Asignado.includes(searchTerm)
  );
  

  return (
    <>
      <Navbar />
      <div className='main-container'>
        <div className='table-container'>
          <div className='search-container'>
            <div className='search-input-wrapper'>
              <img src={searchIcon} alt="Buscar" className='search-icon' />
              <input
                type="text"
                placeholder="Buscar tarea(s) por rut"
                value={searchTerm}
                onChange={handleSearch}
                className='search-input'
              />
            </div>
          </div>
          <TableTask columns={columns} data={filteredTasks} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
      </div>
    </>
  );
};

export default Tasks;
