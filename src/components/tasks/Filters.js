import { Select } from "@chakra-ui/react";
import useFetch from "hooks/useFetch";
import { TaskPriorityList } from "models/TaskPriority";
import TaskStatuses from "models/TaskStatuses";

const TaskFilters = ({ tableModel, tableModelSetter: setTableModel }) => {
    const [projects] = useFetch('/projects')

    const onProjectChange = (ev) => {
        setTableModel({ ...tableModel, filters: { ...tableModel.filters, projectId: ev.target.value } });
    }

    const onPriorityChange = ev => {
        setTableModel({ ...tableModel, filters: { ...tableModel.filters, priority: ev.target.value } });
    }

    const onStatusChange = (ev) => {
        setTableModel({ ...tableModel, filters: { ...tableModel.filters, status: ev.target.value } });
    }

    return <><details>
        <summary>Filters</summary>
        <div className='space-x-2 mx-auto flex items-center'>
            <div>
                <label>Project</label>
                <Select onChange={onProjectChange}>
                    <option value="">(any)</option>
                    {projects && projects.map(project => <option key={project.id} value={project.id}>{project.name}</option>)}
                </Select>
            </div>
            <div>
                <label>Priority</label>
                <Select onChange={onPriorityChange}>
                    <option value="">(any)</option>
                    {TaskPriorityList.map(priority => <option key={`priority_${priority.value}`} value={priority.value}>{priority.name}</option>)}
                </Select>
            </div>
            <div>
                <label>Status</label>
                <Select onChange={onStatusChange}>
                    <option value="">(any)</option>
                    {TaskStatuses.map(status => <option key={`taskstatus_${status.id}`} value={status.id}>{status.name}</option>)}
                </Select>
            </div>
        </div>
    </details>
    </>
}

export default TaskFilters;
