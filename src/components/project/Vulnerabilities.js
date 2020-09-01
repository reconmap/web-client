import React from 'react'
import VulnerabilitiesTable from '../tables/VulnerabilitiesTable'
import Loading from '../ui/Loading'


const ProjectVulnerabilities = ({ vulnerabilities }) => {
    return <section>
        <div className='heading'>
            <h2>Vulnerabilities</h2>
            <button className='sm'>Add New Vulnerability</button>
        </div>
        {vulnerabilities ? <VulnerabilitiesTable vulnerabilities={vulnerabilities} />
            : <Loading />}
    </section>
}

export default ProjectVulnerabilities