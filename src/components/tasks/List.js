import React, { Component } from 'react'
import secureApiFetch from '../../services/api';

class TasksList extends Component {
    state = {
        tasks: []
    }

    componentDidMount() {
        document.title = 'Tasks List | Reconmap';

        secureApiFetch(`/tasks`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => this.setState({ tasks: data }));
    }

    render() {

        return <>
            <h1>Tasks</h1>
            <div className='heading'>
            <div>
                <label>Project</label>
        <select>
                    <option>Any</option>
                    <option>Project 1</option>
                    <option>Project 2</option>
                </select>
            </div>
            <div>
            <label>Assignee</label>
        <select>
                    <option>Anyone</option>
                    <option>User 1</option>
                    <option>User 2</option>
                </select>
            </div>
            <div>
            <label>Status</label>
        <select>
                    <option>Any</option>
                    <option>Open</option>
                    <option>Closed</option>
                </select>
            </div>
            <button>Apply filters</button>
</div>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th>Summary</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.tasks.map((task, index) => 
                    <tr>
                        <td>{task.name}</td>
                        <td>{task.status}</td>
                    </tr>
                )}

                </tbody>
            </table>

        </>
    }
}

export default TasksList
