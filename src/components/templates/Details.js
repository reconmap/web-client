import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import UserBadge from '../badges/UserBadge';
import secureApiFetch from '../../services/api';
import DeleteButton from '../ui/buttons/Delete';

class TemplateDetails extends Component {
    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }
    state = {
        project: null,
        tasks: []
    }

    componentDidMount() {

        const id = this.props.match.params.id;
        Promise.all([
            secureApiFetch(`/projects/${id}`, {
                method: 'GET'
            }),
            secureApiFetch(`/projects/${id}/tasks`, {
                method: 'GET'
            })
        ])
            .then((responses) => Promise.all(responses.map((response) => response.json())))
            .then((responses) => {
                const newState = {
                    project: responses[0],
                    tasks: responses[1]
                };
                this.setState(newState)
                document.title = `${newState.project.name} | Reconmap`;
            })
            .catch((error) => alert(error));
    }

    cloneProject(templateId) {
        secureApiFetch(`/projects/${templateId}/clone`, { method: 'POST', })
            .then((response) => response.json())
            .then(() => { this.props.history.push('/projects'); });
    }

    handleDelete(id) {
        if (window.confirm('Are you sure you want to delete this template?')) {
            secureApiFetch(`/projects/${id}`, {
                method: 'DELETE'
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
                        <button onClick={() => this.cloneProject(this.state.project.id)} title="Create project using this template">Create project</button>
                        <DeleteButton onClick={() => this.handleDelete(this.state.project.id)} />
                    </div>
                </section>

                <section className='grid lg:grid-cols-3 gap-4 my-4'>
                    <div className='base'>
                        <h2>Description</h2>
                        <p>{this.state.project.description}</p>
                    </div>
                </section>
                <section className='grid lg:grid-cols-3 gap-4 my-4'>
                    <article className='base'>
                        <h2>Tasks</h2>
                        <div className='flex flex-col gap-2 mb-2'>
                            {this.state.tasks.map((task, index) =>
                                <div className='flex flex-row items-center justify-start'>
                                    <Link to={"/tasks/" + task.id}>{task.name}</Link>
                                </div>
                            )
                            }
                        </div>
                    </article>
                </section>
            </>
        )
    }
}

export default TemplateDetails