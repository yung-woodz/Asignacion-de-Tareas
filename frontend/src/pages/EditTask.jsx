import Form from "../components/Form.jsx";
import Navbar from "../components/Navbar.jsx";
import { updateTask } from "../services/task.service.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
const EditTask = () => {

	const location = useLocation();
	const navigate = useNavigate();
	const { taskId } = useParams();

	const modTask = (data) => {
		updateTask(data, taskId)
		.then(response => {
			console.log("Task updated successfully:", response);
			navigate('/tasks');
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
						label: "Titulo de Tarea",
                        name: "title",
                        placeholder: "Titulo",
                        type: "text",
                    },
					{
						label: "Descripción de la tarea",
						name: "description",
						placeholder: "Descripcion",
						type: "text",
					},
					{
						label: "Nombre de rol",
						name: "timeSpent",
						placeholder: "Tiempo (min)",
						type: "number",
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
