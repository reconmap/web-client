import { useCommandsQuery } from "api/commands.js";
import { useProjectsQuery } from "api/projects.js";
import HorizontalLabelledField from "components/form/HorizontalLabelledField";
import NativeInput from "components/form/NativeInput";
import NativeSelect from "components/form/NativeSelect";
import Loading from "components/ui/Loading";
import MarkdownEditor from "components/ui/forms/MarkdownEditor";
import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import secureApiFetch from "services/api";
import { TaskPriorityList } from "../../models/TaskPriority.js";
import PrimaryButton from "../ui/buttons/Primary.jsx";

const TaskForm = ({ isEditForm = false, forTemplate = false, onFormSubmit, task, taskSetter: setTask }) => {
    const { data: projects, isLoading: isLoadingProjects } = useProjectsQuery({ isTemplate: forTemplate ? 1 : 0 });
    const { data: commands, isLoading: isLoadingCommands } = useCommandsQuery();

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
        if (!isLoadingProjects && projects.data.length && task.project_id === "") {
            const newProjectId = projects.data[0].id;
            setTask((prevTask) => ({ ...prevTask, project_id: newProjectId }));
        }
    }, [task.project_id, projects, setTask]);

    const loadOptions = (keywords) => {
        return secureApiFetch(`/commands?keywords=` + encodeURIComponent(keywords), { method: "GET" }).then((data) =>
            data.json(),
        );
    };

    if (isLoadingCommands) return <Loading />;

    return (
        <form onSubmit={onFormSubmit}>
            <HorizontalLabelledField
                label="Project"
                htmlFor="projectId"
                control={
                    <NativeSelect
                        id="projectId"
                        name="project_id"
                        onChange={onFormChange}
                        value={task.project_id}
                        required
                    >
                        <optgroup label="Projects">
                            {projects &&
                                projects.data
                                    .filter((project) => project.is_template === 0)
                                    .map((project, index) => (
                                        <option key={index} value={project.id}>
                                            {project.name}
                                        </option>
                                    ))}
                        </optgroup>
                        <optgroup label="Project templates">
                            {projects &&
                                projects.data
                                    .filter((project) => project.is_template === 1)
                                    .map((project, index) => (
                                        <option key={index} value={project.id}>
                                            {project.name}
                                        </option>
                                    ))}
                        </optgroup>
                    </NativeSelect>
                }
            />

            <HorizontalLabelledField
                label="Summary"
                htmlFor="summary"
                control={
                    <NativeInput
                        id="summary"
                        name="summary"
                        type="text"
                        onChange={onFormChange}
                        required
                        autoFocus
                        value={task.summary}
                    />
                }
            />

            <HorizontalLabelledField
                label="Description"
                htmlFor="description"
                control={
                    <MarkdownEditor
                        id="description"
                        name="description"
                        onChange={onFormChange}
                        required
                        value={task.description || ""}
                    />
                }
            />

            <HorizontalLabelledField
                label="Priority"
                htmlFor="priority"
                control={
                    <NativeSelect
                        id="priority"
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
                }
            />

            <HorizontalLabelledField
                label="Duration estimate"
                htmlFor="durationEstimate"
                control={
                    <NativeInput
                        id="durationEstimate"
                        name="duration_estimate"
                        type="number"
                        step="1"
                        min="0"
                        onChange={onFormChange}
                        value={task.duration_estimate}
                    />
                }
            />

            {!forTemplate && (
                <HorizontalLabelledField
                    label="Due date"
                    htmlFor="dueDate"
                    control={
                        <NativeInput
                            id="dueDate"
                            name="due_date"
                            type="date"
                            onChange={onFormChange}
                            value={task.due_date}
                        />
                    }
                />
            )}

            <HorizontalLabelledField
                label="Command"
                htmlFor="commandId"
                control={
                    <AsyncSelect
                        id="commandId"
                        name="command_id"
                        value={selectedCommand}
                        defaultOptions={true}
                        loadOptions={loadOptions}
                        getOptionLabel={(opt) => opt.name}
                        getOptionValue={(opt) => opt.id}
                        onChange={onCommandChange}
                        isClearable
                    />
                }
            />

            <PrimaryButton type="submit">{isEditForm ? "Save" : "Create"}</PrimaryButton>
        </form>
    );
};

export default TaskForm;
