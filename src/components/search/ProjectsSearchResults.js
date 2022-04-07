import ProjectsTable from 'components/projects/Table';
import { useEffect, useState } from 'react';
import secureApiFetch from '../../services/api';

const ProjectsSearchResults = ({ keywords, emptyResultsSetter: setEmptyResults }) => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const reloadData = () => {
            secureApiFetch(`/projects?isTemplate=0&keywords=${keywords}`, { method: 'GET' })
                .then(resp => resp.json())
                .then(projects => {
                    setProjects(projects);
                    setEmptyResults(emptyResults => 0 === projects.length ? emptyResults.concat('projects') : emptyResults.filter(value => value !== 'projects'));
                })
        }

        reloadData()
    }, [keywords, setEmptyResults])

    if (projects.length === 0) return <></>

    return <>
        <h3>{projects.length} matching projects</h3>
        <ProjectsTable projects={projects} />
    </>
}

export default ProjectsSearchResults;
