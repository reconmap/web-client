import React, { Component } from 'react'
import configuration from '../../Configuration';

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
        fetch(`${configuration.api.baseUrl}/tasks/${id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then((responses) => responses.json())
            .then((task) => {
                this.setState({ task: task })
                document.title = `Task ${task.name} | Reconmap`;
            });
            fetch(`${configuration.api.baseUrl}/tasks/${id}/results`, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
                .then((responses) => responses.json())
                .then((data) => {
                    this.setState({ results: data })
                });
        }

    handleDelete(id) {
        if (window.confirm('Are you sure you want to delete this task?')) {
            fetch(`${configuration.api.baseUrl}/tasks/${id}`, {
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
            <>
                <h2>Task {this.state.task.name}</h2>

                <p>{this.state.task.description}</p>

                <dl>
                    <dt>Creation time</dt>
                    <dd>{this.state.task.insert_ts}</dd>
                </dl>

                <h2>Results</h2>

                {
                    this.state.results.length === 0 &&
                        <p>No results</p>
                }

                {
                    this.state.results.map((value, index) => 
                        <div key={index}>
                            Date: {value.insert_ts}<br />
                            <textarea readOnly value={value.output} style={{width: '100%'}} />
                            <hr />
                        </div>
                    )
                }
            </>
        )
    }
}

export default TaskDetails