import deleteIcon from '../assets/deleteIcon.svg';
import updateIcon from '../assets/updateIcon.svg';
import '../styles/styles.css';
import { deleteTask } from '../services/task.service';
import {useNavigate} from 'react-router-dom';

const TableTask = ({ columns, data, onEdit }) => {
  const totalRows = 7;
  const numEmptyRows = totalRows - (data.length > 0 ? data.length : 1);
  const navigate = useNavigate();
  const handleDelete = async (taskId) => {
    try {
      console.log("este es la id del task",taskId);
      await deleteTask(taskId);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleEdit = (taskId) => {
    navigate(`/edit-task/${taskId}`);
  };
  
  return (
    <table id="table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="no-data">
              No se encontraron resultados.
            </td>
          </tr>
        ) : (
          data.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col}>
                  {col === 'Acción' ? (
                    <>
                      <img 
                        src={updateIcon} 
                        alt="Editar" 
                        style={{ marginRight: '10px', cursor: 'pointer', width: '24px', height: '24px' }}
                        onClick={() => handleEdit(row.Asignado)}
                      />
                      <img 
                        src={deleteIcon} 
                        alt="Eliminar" 
                        style={{ cursor: 'pointer', width: '24px', height: '24px' }} 
                        onClick={() => handleDelete(row.Asignado)} 
                      />
                    </>
                  ) : (
                    row[col]
                  )}
                </td>
              ))}
            </tr>
          ))
        )}
        {Array.from({ length: numEmptyRows }).map((_, index) => (
          <tr key={`empty-${index}`} className="empty-row">
            {columns.map((col) => (
              <td key={`${col}-empty-${index}`}></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default TableTask;

