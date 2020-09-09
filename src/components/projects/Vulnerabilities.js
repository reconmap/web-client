import React from 'react'
import VulnerabilitiesTable from '../tables/VulnerabilitiesTable'
import Loading from '../ui/Loading'
import { IconFlag, IconPlus } from '../icons'
import { useHistory } from 'react-router-dom'


const ProjectVulnerabilities = ({ project, vulnerabilities }) => {
    const history = useHistory();
    
    return <section>
        <div className='heading'>
            <IconFlag />
            <h2>Vulnerabilities</h2>
            <button onClick={() => history.push(`/vulnerabilities/create?projectId=${project.id}`)}>
                <IconPlus />
                Add New Vulnerability
            </button>
        </div>
        {vulnerabilities ? <VulnerabilitiesTable vulnerabilities={vulnerabilities} />
            : <Loading />}
    </section>
}

export default ProjectVulnerabilities