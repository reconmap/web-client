import React from 'react'
import VulnerabilitiesTable from '../tables/VulnerabilitiesTable'
import Loading from '../ui/Loading'
import { IconFlag, IconPlus } from '../icons'


const ProjectVulnerabilities = ({ vulnerabilities }) => {
    return <section>
        <div className='heading'>
            <IconFlag />
            <h2>Vulnerabilities</h2>
            <button>
                <IconPlus />
                Add New Vulnerability
            </button>
        </div>
        {vulnerabilities ? <VulnerabilitiesTable vulnerabilities={vulnerabilities} />
            : <Loading />}
    </section>
}

export default ProjectVulnerabilities