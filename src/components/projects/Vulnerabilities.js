import React from 'react'
import VulnerabilitiesTable from '../tables/VulnerabilitiesTable'
import Loading from '../ui/Loading'
import { IconFlag, IconPlus } from '../icons'
import { useHistory } from 'react-router-dom'
import BtnSecondary from '../ui/buttons/BtnSecondary'


const ProjectVulnerabilities = ({ project, vulnerabilities }) => {
    const history = useHistory();
    
    const handleCreateVulnerability = () => {
        history.push(`/vulnerabilities/create?projectId=${project.id}`)
    }
    return <section>
        <div className='heading'>
            <IconFlag />
            <h2>Vulnerabilities</h2>
            <BtnSecondary size='sm' onClick={handleCreateVulnerability}>
                <IconPlus size={4} />
                Add New Vulnerability
            </BtnSecondary>
        </div>
        {vulnerabilities ? <VulnerabilitiesTable vulnerabilities={vulnerabilities} />
            : <Loading />}
    </section>
}

export default ProjectVulnerabilities