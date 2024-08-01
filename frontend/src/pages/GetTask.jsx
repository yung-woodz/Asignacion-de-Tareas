import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Table from '../components/Table';
import { getTasks, deleteTask, updateTask } from '../services/task.service';
import searchIcon from '../assets/searchIcon.svg';

const GetTask = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const columns = ['Título', 'Descripción', 'Asignado', 'Tiempo', 'Estado', 'Acción'];

  const fetchData = async () => {
    try {
      const response = await getTasks();
      const formattedData = response.data.map(task => ({
        Título: task.title,
        Descripción: task.description,
        Asignado: task.assignedTo, // Puedes necesitar mapear este valor a un nombre de usuario si tienes esa información
        Tiempo: task.timeSpent,
        Estado: task.status
      }));
      setTasks(formattedData);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask({ taskId });
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleEdit = (taskId) => {
    const task = tasks.find(t => t._id === taskId);
    navigate(`/edit-task/${taskId}`, { state: { task } });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredTasks = tasks.filter(task =>
    task.Título.toLowerCase().includes(searchTerm.toLowerCase())
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
                placeholder="Buscar tarea por título"
                value={searchTerm}
                onChange={handleSearch}
                className='search-input'
              />
            </div>
          </div> 
          <Table columns={columns} data={tasks} /*onDelete={handleDelete} onEdit={handleEdit} *//>
        </div>
      </div>
    </>
  );
};

export default GetTask;
