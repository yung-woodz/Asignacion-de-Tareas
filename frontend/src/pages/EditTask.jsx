import Form from "../components/Form.jsx";
import Navbar from "../components/Navbar.jsx";
import { updateTask } from "../services/task.service.js";
import { useLocation, useNavigate } from "react-router-dom";
const EditTask = () => {

	const location = useLocation();
	const navigate = useNavigate();

	const { task } = location.state;

	const modTask = (data) => {
        updateTask(data, task._id)
            .then(response => {
                console.log("Task updated successfully:", response);
				navigate('/works/tasks');
            })
            .catch(error => {
                console.error("Error updating task:", error);
            });
    };

	return (
		<>
			<Navbar />
			<div className="form-container">
			<div className="form-wrapper">
			<Form
				title="Editar Tarea"
				fields={[
					{
						label: "Nombre de la tarea",
						name: "title",
						placeholder: task.Title || "nombre tarea",
						type: "text",
					},
					{
						label: "Descripción",
						name: "description",
						placeholder: task.description || ". . . . .",
						type: "text",
					},
					{
						label: "Tiempo requerido",
						name: "timeSpent",
						placeholder: task.timeSpent ||"60",
						type: "text",
					},
				]}
				buttonText="Guardar cambios"
				onSubmit={modTask}
			/>
			</div>
			</div>
		</>
	);
};

export default EditTask;
