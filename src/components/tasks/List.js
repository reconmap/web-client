import React, { useState } from 'react'
import DeleteButton from '../ui/buttons/Delete';
import useSetTitle from '../../hooks/useSetTitle';
import Loading from '../ui/Loading';
import NoResults from '../ui/NoResults';
import useDelete from '../../hooks/useDelete';
import ProjectBadge from '../badges/ProjectBadge';
import StatusBadge from '../badges/StatusBadge';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import { Link } from 'react-router-dom';

const TasksList = ({ history }) => {
    useSetTitle('Tasks');
    const [tasks, updateTasks] = useFetch('/tasks')
    const [projects] = useFetch('/projects')
    const [filter, setFilter] = useState({ project: '', user: '', status: '' })

    const handleSetProject = (e) => { setFilter({ ...filter, project: e.target.value }) }
    const handleSetStatus = (e) => { setFilter({ ...filter, status: e.target.value }) }

    const destroy = useDelete('/tasks/', updateTasks);

    return <>
        <Breadcrumb path={history.location.pathname} />

        <div className='heading'>
            <h1>Tasks</h1>
            <div>
                <label>Project</label>
                <select onChange={handleSetProject}>
                    <option value=''>Any</option>
                    {projects && projects.map(project => <option value={project.id} key={project.id}>{project.name}</option>)}
                </select>
            </div>
            <div>
                <label>Status</label>
                <select onChange={handleSetStatus}>
                    <option value=''>Any</option>
                    <option value='0'>Open</option>
                    <option value='1'>Closed</option>
                </select>
            </div>
        </div>

        {!tasks ? <Loading /> : tasks.length === 0 ? <NoResults /> :
            <table className='w-full'>
                <thead>
                    <tr>
                        <th>Summary</th>
                        <th>Project</th>
                        <th>Parser</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks
                        .filter(task => task.project_id.includes(filter.project))
                        .filter(task => task.completed.includes(filter.status))
                        .map((task) =>
                            <tr key={task.id}>
                                <th>
                                    <details>
                                        <summary className='text-white flex items-center cursor-pointer'><Link to={`/tasks/${task.id}`}>{task.name}</Link></summary>
                                    </details>
                                </th>
                                <td><ProjectBadge name={projects && projects.find(({ id }) => id === task.project_id)?.name} /></td>
                                <td className='font-mono text-gray-500 '>{task.parser}</td>
                                <td><StatusBadge status={task.completed} /></td>
                                <td className='text-right'><DeleteButton onClick={() => destroy(task.id)} /></td>
                            </tr>
                        )}

                </tbody>
            </table>}

    </>
}

export default TasksList
