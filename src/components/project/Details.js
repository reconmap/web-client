import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import configuration from '../../Configuration';
import UserBadge from '../badges/UserBadge';

class ProjectDetails extends Component {
    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }
    state = {
        project: null,
        tasks: [],
        targets: [],
    }

    componentDidMount() {

        const id = this.props.match.params.id;
        Promise.all([
            fetch(`${configuration.api.baseUrl}/projects/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            }),
            fetch(`${configuration.api.baseUrl}/projects/${id}/tasks`, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            }),
            fetch(`${configuration.api.baseUrl}/projects/${id}/targets`, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
        ])
            .then((responses) => Promise.all(responses.map((response) => response.json())))
            .then((responses) => {
                const [project, tasks, targets] = responses;
                this.setState({ project: project, tasks: tasks, targets: targets })
                document.title = `${project.name} | Reconmap`;
            });
    }

    handleDelete(id) {
        if (window.confirm('Are you sure you want to delete this project?')) {
            fetch(`${configuration.api.baseUrl}/projects/${id}`, {
                method: 'DELETE',
                headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') }
            })
                .then(() => { this.props.history.goBack() })
                .catch(e => console.log(e))

        }
    }

    render() {
        if (!this.state.project) {
            return 'Loading...'
        }
        return (
            <>
                <section className='flex lg:items-center justify-between my-4 pb-4 border-b border-gray-800 flex-col lg:flex-row' >
                    <div className='items-center flex gap-4'>
                        <button onClick={() => console.log('go back function')}><i data-feather="arrow-left"></i></button>
                        <h2 className='text-white'>{this.state.project.name}</h2>
                    </div>
                    <div className='flex items-center justify-between gap-4'>
                        <button href="generate-report.html">Generate Report</button>
                        <button href="">Archive</button>
                        <button onClick={() => this.handleDelete(this.state.project.id)}>Delete</button>
                    </div>
                </section>

                <section className='grid lg:grid-cols-3 gap-4 my-4'>
                    <div className='base'>
                        <h3>Description</h3>

                        <p>{this.state.project.description}</p>
                    </div>
                    <div className='base'>
                        <h3>Target(s)</h3>
                        <table className='font-mono text-sm w-full' >
                            <thead>
                                <tr><th>Host</th><th>uri</th></tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.targets.map((target, index) =>
                                        <tr key={index}><td>{target.kind}</td><td>{target.name}</td></tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='base'>
                        <h3>Vulnerabilities</h3>
                        <p><a href="add.html">Add Vulnerability</a></p>
                        <ul>
                            <li>Vulnerability "sql injection" found on host "www.fom" on date 2020-08-12 by user "Ethical hacker 1"</li>
                        </ul>
                    </div>
                </section>
                <section className='grid lg:grid-cols-3 gap-4 my-4'>
                    <div>
                        <h3>Team</h3>
                        <a href="/users/1">Ethical hacker 1</a>
                        <div className='flex flex-wrap'>
                            <UserBadge name='Santiago Lizardo' role='Full Stack Dev' />
                            <UserBadge name='Pablo Lizardo' role='UX Designer' />
                        </div>
                    </div>
                    <div>
                        <h3>Tasks (1/{this.state.tasks.length} completed)</h3>
                        {
                            this.state.tasks.map((task, index) =>
                            <><input type="checkbox" checked="checked" /> {task.name} (<Link to="/dashboard/tasks/upload">Upload results</Link>)<br /></>
                            )
                        }
                        <br />
                        <button href="">Add task</button>
                    </div>
                    <div>

                        <h3>Audit log</h3>
                        <ul>
                            <li>2020-08-12 22:26 User "Ethical hacker 1" uploaded results for task "Run port scanner"</li>
                        </ul>

                        <button href="export">Export audit log</button>
                    </div>
                </section>
            </>
        )
    }
}

export default ProjectDetails