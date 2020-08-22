import React, { Component } from 'react'
import secureApiFetch from '../../services/api'

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

    handleDelete(id) {
        if (window.confirm('Are you sure you want to delete this task?')) {
            secureApiFetch(`/tasks/${id}`, {
                method: 'DELETE',
                headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') }
            })
                .then(() => { this.props.history.goBack() })
                .catch(e => console.log(e))

        }
    }

    render() {
        if (!this.state.task) {
            return 'Loading...'
        }
        return (
            <div>
                <h3 className='heading'>Task {this.state.task.name}</h3>
                <div className='flex items-start gap-4'>
                    <article className='base w-48'>
                        <p>{this.state.task.description}</p>
                        <footer>
                            <label>Creation time</label>
                            <strong>{this.state.task.insert_ts}</strong>
                        </footer>
                    </article>
                    <article className='base flex-1'>
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