import { Select } from '@chakra-ui/react'
import RestrictedComponent from 'components/logic/RestrictedComponent'
import CreateButton from 'components/ui/buttons/Create'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import useFetch from "../../hooks/useFetch"
import ButtonGroup from '../ui/buttons/ButtonGroup'
import { IconFlag } from '../ui/Icons'
import Loading from '../ui/Loading'
import VulnerabilitiesTable from '../vulnerabilities/VulnerabilitiesTable'

const ProjectVulnerabilities = ({ project }) => {
    const history = useHistory();

    const [vulnerabilities, reloadVulnerabilities] = useFetch(`/projects/${project.id}/vulnerabilities`)

    const handleCreateVulnerability = () => {
        history.push(`/vulnerabilities/create?projectId=${project.id}`)
    }

    const [category, setCategory] = useState('')
    const [risk, setRisk] = useState('')
    const [status, setStatus] = useState('')

    return <section>
        <h4><IconFlag />Vulnerabilities
            <ButtonGroup>
                {vulnerabilities &&
                    <VulnerabilityFilters vulnerabilities={vulnerabilities} setRisk={setRisk} setCategory={setCategory}
                        setStatus={setStatus} />}
                <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                    <CreateButton onClick={handleCreateVulnerability}>Add new vulnerability</CreateButton>
                </RestrictedComponent>
            </ButtonGroup>
        </h4>
        {
            vulnerabilities ?
                <VulnerabilitiesTable
                    vulnerabilities={vulnerabilities.filter(vuln => ((vuln.category_name && vuln.category_name.includes(category)) || vuln.category_name === null) && vuln.risk.includes(risk) && vuln.status.includes(status))}
                    reloadCallback={reloadVulnerabilities}
                />
                : <Loading />
        }
    </section >
}

export default ProjectVulnerabilities


const VulnerabilityFilters = ({ vulnerabilities, setCategory, setRisk, setStatus }) => {
    const handleSetCategory = ev => {
        setCategory(ev.target.value)
    }
    const handleSetRisk = ev => {
        setRisk(ev.target.value)
    }
    const handleSetStatus = ev => {
        setStatus(ev.target.value)
    }
    return <div className='space-x-2 mx-auto flex items-center '>
        <div>
            <label>Risk</label>
            <Select onChange={handleSetRisk}>
                <option value=''>(any)</option>
                {[...new Set(vulnerabilities.map(vuln => vuln.risk))]
                    .map((risk, index) => <option value={risk} key={index}>{risk.charAt(0).toUpperCase() + risk.slice(1)}</option>)}
            </Select>
        </div>

        <div>
            <label>Category</label>
            <Select onChange={handleSetCategory}>
                <option value=''>(any)</option>
                {[...new Set(vulnerabilities.filter(vuln => vuln.category_name).map(vuln => vuln.category_name))]
                    .map((cat, index) => <option value={cat} key={index}>{cat}</option>)}
            </Select>
        </div>
        <div>
            <label>Status</label>
            <Select onChange={handleSetStatus}>
                <option value=''>(any)</option>
                <option value='open'>Open</option>
                <option value='closed'>Closed</option>
            </Select>
        </div>
    </div>
}
