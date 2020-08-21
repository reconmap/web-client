import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import configuration from '../../Configuration';
import UserBadge from '../badges/UserBadge';
import secureApiFetch from '../../services/api';

class ProjectDetails extends Component {
    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }
    state = {
        project: null,
        tasks: [],
        targets: [],
        vulnerabilities: []
    }

    componentDidMount() {

        const id = this.props.match.params.id;
        Promise.all([
            secureApiFetch(`/projects/${id}`, {
                method: 'GET'
            }),
            secureApiFetch(`/projects/${id}/tasks`, {
                method: 'GET'
            }),
            secureApiFetch(`/projects/${id}/targets`, {
                method: 'GET'
            }),
            secureApiFetch(`/projects/${id}/vulnerabilities`, {
                method: 'GET'
            })
        ])
            .then((responses) => Promise.all(responses.map((response) => response.json())))
            .then((responses) => {
                const newState = {
                    project: responses[0],
                    tasks: responses[1],
                    targets: responses[2],
                    vulnerabilities: responses[3],
                };
                console.dir(newState);
                this.setState(newState)
                document.title = `${newState.project.name} | Reconmap`;
            })
            .catch((error) => alert(error));
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
                        <button onClick={() => document.location = `/project/${this.state.project.id}/report`}>Generate Report</button>
                        <button href="">Archive</button>
                        <button onClick={() => this.handleDelete(this.state.project.id)} type='delete'>Delete</button>
                    </div>
                </section>

                <section className='grid lg:grid-cols-3 gap-4 my-4'>
                    <div className='base'>
                        <h2>Description</h2>
                        <p>{this.state.project.description}</p>
                    </div>
                    <div className='base'>
                        <h2>Target(s)</h2>
                        <table className='font-mono text-sm w-full' >
                            <thead>
                                <tr><th>Host</th><th>uri</th></tr>
                            </thead>
                            <tbody>
                                {this.state.targets.map((target, index) =>
                                    <tr key={index}><td>{target.kind}</td><td>{target.name}</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className='base'>
                        <h2>Vulnerabilities</h2>
                            <ul>
                                {
                                    this.state.vulnerabilities.map((vuln, index) =>
                                        <li key={index}>{vuln.summary}</li>
                                    )
                                }
                            </ul>
                            <footer>

                        <button href="add.html" >Add New Vulnerability</button>
                            </footer>
                    </div>
                </section>
                <section className='grid lg:grid-cols-3 gap-4 my-4'>
                    <article className='base'>
                        <h2>Team</h2>
                        <div className='flex flex-wrap'>
                            <UserBadge name='Santiago Lizardo' role='Full Stack Dev' />
                            <UserBadge name='Pablo Lizardo' role='UX Designer' />
                        </div>
                    </article>
                    <article className='base'>
                        <h2>Tasks <small>1/{this.state.tasks.length} completed</small></h2>
                        <div className='flex flex-col gap-2 mb-2'>
                            { this.state.tasks.map((task, index) =>
                                <div className='flex flex-row items-center justify-start'>
                                    <input type="checkbox" checked="checked" readOnly className='mr-4'/> 
                                    <Link to={"/tasks/" + task.id}>{task.name}</Link>
                                    <Link className=' ml-auto' to={"/tasks/" + task.id + "/upload"}><button className='w-20'>Upload results</button></Link>
                                </div>
                                )
                            }
                        </div>
                        <footer>
                            <button href="">Add task</button>
                        </footer>
                    </article>
                    <article className='base'>
                        <h2>Audit log</h2>
                        <ul>
                            <li>2020-08-12 22:26 User "Ethical hacker 1" uploaded results for task "Run port scanner"</li>
                        </ul>
                        <footer>
                            <button href="export">Export audit log</button>
                        </footer>
                    </article>
                </section>
            </>
        )
    }
}

export default ProjectDetails