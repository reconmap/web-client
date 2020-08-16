import React, { Component } from 'react'
import { useParams, Link } from 'react-router-dom';
import configuration from '../../Configuration';

class Project extends Component {
    state = {
        project: null
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        fetch(`${configuration.api.baseUrl}/projects/${id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then((response) => response.json())
            .then((project) => this.setState({ project: project }));
    }

    render() {
        if (!this.state.project) {
            return 'Loading...'
        }
        return (
            <>
                <section className='flex lg:items-center justify-between my-4 pb-4 border-b border-gray-800 flex-col lg:flex-row' >
                    <div className='items-center flex gap-4'>
                        <button onClick={() => console.log('go back function')}><i className='fa fa-angle-left' /></button>
                        <h2 className='text-white'>{this.state.project.name}</h2>
                    </div>
                    <div className='flex items-center justify-between gap-4'>
                        <button href="">Archive</button>
                        <button href="">Delete</button>
                        <button href="generate-map-report.html">Generate Recon Map Report</button>
                        <button href="generate-report.html">Generate Recconnaisance Report</button>
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

                                <tr><td>Host</td><td>www.fom</td></tr>
                                <tr><td>Host</td><td>www.foa</td></tr>
                                <tr><td>Host</td><td>www.fas</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='base'>
                        <h3>Vulnerabilities</h3>
                        <p><a href="#">Add Vulnerability</a></p>
                        <ul>
                            <li>Vulnerability "sql injection" found on host "www.fom" on date 2020-08-12 by user "Ethical hacker 1"</li>
                        </ul>
                    </div>
                </section>
                <section className='grid lg:grid-cols-3 gap-4 my-4'>
                    <div>
                        <h3>Team</h3>
                        <a href="">Ethical hacker 1</a>
                    </div>
                    <div>
                        <h3>Tasks (1/3 completed)</h3>
                        <input type="checkbox" checked="checked" /> Run port scanner (<Link to="/dashboard/tasks/upload">Upload results</Link>)<br />
                        <input type="checkbox" /> Run tool X (<a href="#">Upload results</a>)<br />
                        <input type="checkbox" /> Run tool Y (<a href="#">Upload results</a>)<br />
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

export default Project