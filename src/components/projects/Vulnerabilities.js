import React, { useState } from 'react'
import VulnerabilitiesTable from '../tables/VulnerabilitiesTable'
import Loading from '../ui/Loading'
import { IconCollection, IconFlag, IconPlus } from '../icons'
import { useHistory } from 'react-router-dom'
import BtnSecondary from '../ui/buttons/BtnSecondary'
import ButtonGroup from '../ui/buttons/ButtonGroup'


const ProjectVulnerabilities = ({ project, vulnerabilities }) => {
    const history = useHistory();
    
    const handleCreateVulnerability = () => {
        history.push(`/vulnerabilities/create?projectId=${project.id}=1`)
    }

    const [category, setCategory] = useState('')
    const [risk, setRisk] = useState('')
    const [status, setStatus] = useState('')
    return <section>
        <div className='heading'>
            <IconFlag />
            <h2>Vulnerabilities</h2>
            <ButtonGroup>
                {vulnerabilities && <VulnerabilityFilters vulnerabilities={vulnerabilities} setRisk={setRisk} setCategory={setCategory} setStatus={setStatus}/>}
                <BtnSecondary size='sm' onClick={handleCreateVulnerability}>
                    <IconPlus size={4} />
                    Add New Vulnerability
                </BtnSecondary>
            </ButtonGroup>
        </div>
        {vulnerabilities ? 
                <VulnerabilitiesTable 
                    vulnerabilities={vulnerabilities .filter(vuln=> vuln.category_name.includes(category) && vuln.risk.includes(risk)  && vuln.status.includes(status) ) } />
            : <Loading />}
    </section>
}

export default ProjectVulnerabilities


const VulnerabilityFilters = ({vulnerabilities, setCategory,setRisk, setStatus}) => {
    const handleSetCategory = e => {
        setCategory(e.target.value)
    }
    const handleSetRisk = e => {
        setRisk(e.target.value)
    }
    const handleSetStatus = e => {
        setStatus(e.target.value)
    }
    return <div className='space-x-5 mx-auto flex items-center '>
                <div>
                    <label>Risk</label>
                    <select  onChange={handleSetRisk}>
                        <option value=''>Any</option>
                        { [...new Set(vulnerabilities.map(vuln=>vuln.risk))]
                                .map( (risk,index) => <option value={risk} key={index}>{risk.toUpperCase()}</option> )}
                    </select>
                </div>

                <div>
                    <label>Category</label>
                    <select onChange={handleSetCategory}>
                        <option value=''>Any</option>
                        { [...new Set(vulnerabilities.map(vuln=>vuln.category_name))]
                                .map( (cat,index) => <option value={cat} key={index}>{cat}</option> )}
                    </select>
                </div>
                <div>
                    <label>Status</label>
                    <select onChange={handleSetStatus}>
                        <option value=''>Any</option>
                        <option value='open'>Open</option>
                        <option value='closed'>Closed</option>
                    </select>
                </div>
            </div>
}