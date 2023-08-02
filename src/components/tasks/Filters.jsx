import { Select } from "@chakra-ui/react";
import { useAuth } from "contexts/AuthContext";
import useFetch from "hooks/useFetch";
import { TaskPriorityList } from "models/TaskPriority";
import TaskStatuses from "models/TaskStatuses";

const TaskFilters = ({ tableModel, tableModelSetter: setTableModel }) => {
    const { user: loggedInUser } = useAuth();
    const [projects] = useFetch('/projects');
    const [users] = useFetch('/users');

    const onFilterChange = ev => {
        setTableModel({ ...tableModel, filters: { ...tableModel.filters, [ev.target.name]: ev.target.value } });
    }

    return <><details>
        <summary>Filters</summary>
        <div className='space-x-2 mx-auto flex items-center'>
            <div>
                <label>Project</label>
                <Select name="projectId" onChange={onFilterChange}>
                    <option value="">(any)</option>
                    {null !== projects && projects.map(project => <option key={project.id} value={project.id}>{project.name}</option>)}
                </Select>
            </div>
            <div>
                <label>Priority</label>
                <Select name="priority" onChange={onFilterChange}>
                    <option value="">(any)</option>
                    {TaskPriorityList.map(priority => <option key={`priority_${priority.value}`} value={priority.value}>{priority.name}</option>)}
                </Select>
            </div>
            <div>
                <label>Assignee</label>
                <Select name="assigneeUid" onChange={onFilterChange}>
                    <option value="">(anybody)</option>
                    {null !== users && users.map(user => <option key={user.id} value={user.id}>{user.full_name}{user.id === loggedInUser.id ? " (You)" : ""}</option>)}
                </Select>
            </div>
            <div>
                <label>Status</label>
                <Select name="status" onChange={onFilterChange}>
                    <option value="">(any)</option>
                    {TaskStatuses.map(status => <option key={`taskstatus_${status.id}`} value={status.id}>{status.name}</option>)}
                </Select>
            </div>
        </div>
    </details>
    </>
}

export default TaskFilters;
