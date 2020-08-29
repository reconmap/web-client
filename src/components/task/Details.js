import React, { Component } from 'react'
import secureApiFetch from '../../services/api'
import { Link } from 'react-router-dom'

class TaskDetails extends Component {
    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }

    state = {
        task: null,
        results: []
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        secureApiFetch(`/tasks/${id}`, {
            method: 'GET'
        })
            .then((responses) => responses.json())
            .then((task) => {
                this.setState({ task: task })
                document.title = `Task ${task.name} | Reconmap`;
            });
        secureApiFetch(`/tasks/${id}/results`, {
            method: 'GET'
        })
            .then((responses) => responses.json())
            .then((data) => {
                this.setState({ results: data })
            });
    }

    handleToggle(task) {
        secureApiFetch(`/tasks/${task.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ completed: task.completed ? '0' : '1' })
        })
            .then(() => { this.props.history.goBack() })
            .catch(e => console.log(e))
    }

    handleDelete(id) {
        if (window.confirm('Are you sure you want to delete this task?')) {
            secureApiFetch(`/tasks/${id}`, {
                method: 'DELETE'
            })
                .then(() => { this.props.history.goBack() })
                .catch(e => console.log(e))

        }
    }

    render() {
        const task = this.state.task;
        if (!this.state.task) {
            return 'Loading...'
        }
        return (
            <div>
                <h3 className='heading'>Task {this.state.task.name}</h3>
                <div className='flex items-start gap-4'>
                    <article className='card'>
                        <p><em>Created on {this.state.task.insert_ts}</em></p>
                        <h2>Instructions</h2>
                        <p>{this.state.task.description}</p>
                        <h2>Actions</h2>

                        {task.completed === 1 && <button onClick={() => this.handleToggle(task)}>Mark as incompleted</button>}
                        {task.completed !== 1 && <button onClick={() => this.handleToggle(task)}>Mark as completed</button>}
                        <Link className=' ml-auto' to={"/tasks/" + task.id + "/upload"}><button>Upload results</button></Link>
                    </article>
                    <article className='card flex-1'>
                        <h3>Results</h3>
                        {this.state.results.map((value, index) =>
                            <div key={index} className='pb-2 border-b mb-2'>
                                <label>Date: {value.insert_ts}</label>
                                <textarea readOnly value={value.output} style={{ width: '100%' }} />
                            </div>
                        )}
                        {this.state.results.length === 0 && <footer> No results </footer>}
                    </article>
                </div>
            </div>
        )
    }
}

export default TaskDetails