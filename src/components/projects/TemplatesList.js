import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import secureApiFetch from '../../services/api';

class TemplatesList extends Component {
    state = {
        templates: []
    }

    cloneProject(templateId) {
        secureApiFetch(`/projects/${templateId}/clone`, {
            method: 'POST',
        })
            .then((response) => response.json())
            .then((data) => {
                this.props.history.push('/projects');
            });
    }

    componentDidMount() {
        document.title = 'Project templates | Reconmap';

        secureApiFetch(`/projects?isTemplate=1`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => this.setState({ templates: data }));
    }

    render() {
        return (
            <>
                <div className='heading'>
                    <h1>Project templates</h1>
                    <button ><i data-feather='plus' className='mr-2'/> Create Template</button>
                </div>
                <section className='flex flex-wrap gap-4'>

                    {
                        this.state.templates.map((template, index) =>
                            <Link onClick={() => this.cloneProject(template.id)}>
                                <article className='base base-project'>
                                    <header>
                                        <button href="project.html">Start from this</button>
                                        <button href="clone.html" className='ml-2'>Clone</button>
                                    </header>
                                    <h1>{template.name}</h1>
                                    <footer>
                                        <span className='text-red-600'>3 tasks</span>
                                        <span className='ml-2'>java</span>
                                        <span className='ml-2'>local</span>
                                    </footer>
                                </article>
                            </Link>

                        )
                    }
                </section>

            </>
        )
    }
}

export default TemplatesList
