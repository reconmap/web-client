import NativeInput from "components/form/NativeInput";
import NativeSelect from "components/form/NativeSelect";
import Loading from "components/ui/Loading";
import MarkdownEditor from "components/ui/forms/MarkdownEditor";
import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import secureApiFetch from "services/api";
import useFetch from "../../hooks/useFetch";
import { TaskPriorityList } from "../../models/TaskPriority";
import PrimaryButton from "../ui/buttons/Primary";

const TaskForm = ({
    isEditForm = false,
    forTemplate = false,
    onFormSubmit,
    task,
    taskSetter: setTask,
}) => {
    const [projects] = useFetch("/projects");
    const [commands] = useFetch("/commands");

    const onFormChange = (ev) => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setTask({ ...task, [name]: value });
    };

    const initialCommand = { id: task.command_id, name: task.command_name };
    const [selectedCommand, setSelectedCommand] = useState(initialCommand);

    const onCommandChange = (command) => {
        setSelectedCommand(command);
        setTask({ ...task, command_id: command.id });
    };

    useEffect(() => {
        if (projects !== null && projects.length && task.project_id === "") {
            const newProjectId = projects[0].id;
            setTask((prevTask) => ({ ...prevTask, project_id: newProjectId }));
        }
    }, [task.project_id, projects, setTask]);

    const loadOptions = (keywords) => {
        return secureApiFetch(
            `/commands?keywords=` + encodeURIComponent(keywords),
            { method: "GET" },
        ).then((data) => data.json());
    };

    if (!commands) return <Loading />;

    return (
        <form onSubmit={onFormSubmit}>
            <label>
                Project
                <NativeSelect
                    name="project_id"
                    onChange={onFormChange}
                    value={task.project_id}
                    required
                >
                    <optgroup label="Projects">
                        {projects &&
                            projects
                                .filter((project) => project.is_template === 0)
                                .map((project, index) => (
                                    <option key={index} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                    </optgroup>
                    <optgroup label="Project templates">
                        {projects &&
                            projects
                                .filter((project) => project.is_template === 1)
                                .map((project, index) => (
                                    <option key={index} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                    </optgroup>
                </NativeSelect>
            </label>
            <label>
                Summary
                <NativeInput
                    type="text"
                    name="summary"
                    onChange={onFormChange}
                    required
                    autoFocus
                    value={task.summary}
                />
            </label>
            <label>
                Description
                <MarkdownEditor
                    name="description"
                    onChange={onFormChange}
                    required
                    value={task.description || ""}
                />
            </label>
            <label>
                Priority
                <NativeSelect
                    name="priority"
                    onChange={onFormChange}
                    value={task.priority || "medium"}
                >
                    {TaskPriorityList.map((priority, index) => (
                        <option key={index} value={priority.value}>
                            {priority.name}
                        </option>
                    ))}
                </NativeSelect>
            </label>
            <label>
                Due date
                <NativeInput
                    type="date"
                    name="due_date"
                    onChange={onFormChange}
                    value={task.due_date}
                />
            </label>
            <label>
                Command
                <AsyncSelect
                    name="command_id"
                    value={selectedCommand}
                    defaultOptions={true}
                    loadOptions={loadOptions}
                    getOptionLabel={(opt) => opt.name}
                    getOptionValue={(opt) => opt.id}
                    onChange={onCommandChange}
                    isClearable
                />
            </label>

            <PrimaryButton type="submit">
                {isEditForm ? "Save" : "Create"}
            </PrimaryButton>
        </form>
    );
};

export default TaskForm;
