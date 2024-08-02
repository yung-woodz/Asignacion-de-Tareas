import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TableTask from '../components/TableTask';
import searchIcon from '../assets/searchIcon.svg';
import { getTasks, deleteTask } from '../services/task.service.js';

const GetTask = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const columns = ['Título', 'Descripción', 'Asignado', 'Tiempo', 'Estado', 'Acción'];

  const fetchData = async () => {
    try {
      const response = await getTasks();
      const formattedData = response.data.map(task => ({
        _id: task._id,
        Título: task.title,
        Descripción: task.description,
        Asignado: task.assignedTo, 
        Tiempo: task.timeSpent,
        Estado: task.status
      }));
      setTasks(formattedData);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      console.log("este es la id del task",_id);
      await deleteTask(_id);
      setTasks(tasks.filter(task => task._id !== _id));
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
    fetchData();
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
                placeholder="Buscar tarea por título"
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

export default GetTask;