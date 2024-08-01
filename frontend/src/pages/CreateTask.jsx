import { useNavigate } from 'react-router-dom';
import { createTask } from '../services/task.service.js'
import FormTask from "../components/FormTask.jsx";
import Form from "../components/Form.jsx";
import ImgLogo from "../components/ImgLogo.jsx";
import Navbar from '../components/Navbar.jsx';

const CreateTask = () => {

    const navigate = useNavigate();


	const createTaskSubmit = (data) => {
		createTask(data).then(() => {
			navigate('/users');
		})

		if(data) alert('Tarea Creada!');
			else alert('no');
        
    }

	return (
		<main className="task_page">
			<Navbar />
			<div className="sections">
				<FormTask
					backgroundColor="#FFFFFF"
					title="Crea tus tareas"
					fields={[
						{
							label: "Nombre de la tarea",
							name: "title",
							placeholder: "Didudo",
							type: "text",
						},
						{
							label: "Descripción",
							name: "description",
							placeholder: ". . . . .",
							type: "text",
						},
						{
							label: "RUT de la persona dirigida",
							name: "assignedTo",
							placeholder: "23.770.330-1",
							type: "text",
							require: true,
						},
						{
							label: "Tiempo requerido",
							name: "timeSpent",
							placeholder: "60",
							type: "text",
						},
					]}
					buttonText="Crear"
					onSubmit={createTaskSubmit}
				/>
			</div>
		</main>
	);
};

export default CreateTask;