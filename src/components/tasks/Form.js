import MarkdownEditor from "components/ui/forms/MarkdownEditor";
import Loading from "components/ui/Loading";
import { useEffect } from 'react';
import useFetch from "../../hooks/useFetch";
import PrimaryButton from "../ui/buttons/Primary";

const TaskForm = ({ isEditForm = false, onFormSubmit, task, taskSetter: setTask }) => {

    const [projects] = useFetch('/projects');
    const [commands] = useFetch('/commands');

    const onFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setTask({ ...task, [name]: value });
    };

    useEffect(() => {
        if (projects !== null && projects.length && task.project_id === "") {
            const newProjectId = projects[0].id;
            setTask(prevTask => ({ ...prevTask, project_id: newProjectId }));
        }
    }, [task.project_id, projects, setTask]);

    if (!commands) return <Loading />

    return <form onSubmit={onFormSubmit}>
        <label>
            Project
            <select name="project_id" onChange={onFormChange}
                value={task.project_id} required>
                {projects && projects.map((project, index) =>
                    <option key={index} value={project.id}>{project.name}</option>
                )}
            </select>
        </label>
        <label>Summary
            <input type="text" name="summary" onChange={onFormChange} required autoFocus
                value={task.summary} /></label>
        <label>Description
            <MarkdownEditor name="description" onChange={onFormChange} required
                value={task.description} /></label>
        <label>Due date
            <input type="date" name="due_date" onChange={onFormChange} value={task.due_date} /></label>
        <label>Command
            <select name="command_id" onChange={onFormChange} value={task.command_id}>
                <option value="">(none)</option>
                {commands.map((command) =>
                    <option value={command.id}>{command.short_name}</option>
                )}
            </select>
        </label>

        <PrimaryButton type="submit">{isEditForm ? "Save" : "Create"}</PrimaryButton>
    </form>
}

export default TaskForm;
