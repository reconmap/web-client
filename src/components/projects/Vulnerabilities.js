import { HStack, Select } from '@chakra-ui/react';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import CreateButton from 'components/ui/buttons/Create';
import VulnerabilityTableModel from 'components/vulnerabilities/VulnerabilityTableModel';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import { IconFlag } from '../ui/Icons';
import VulnerabilitiesTable from '../vulnerabilities/VulnerabilitiesTable';

const ProjectVulnerabilities = ({ project }) => {
    const [tableModel, setTableModel] = useState(new VulnerabilityTableModel)

    const navigate = useNavigate();

    const [vulnerabilities, reloadVulnerabilities] = useFetch(`/vulnerabilities?projectId=${project.id}&orderColumn=${tableModel.sortBy.column}&orderDirection=${tableModel.sortBy.order}`)

    const handleCreateVulnerability = () => {
        navigate(`/vulnerabilities/create?projectId=${project.id}`)
    }

    const [category, setCategory] = useState('')
    const [risk, setRisk] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
        setTableModel(tableModel => ({ ...tableModel, vulnerabilities: vulnerabilities }));
    }, [vulnerabilities])

    return <section>
        <h4><IconFlag />Vulnerabilities
            <HStack alignItems='flex-end'>
                {tableModel.vulnerabilities &&
                    <VulnerabilityFilters vulnerabilities={tableModel.vulnerabilities} setRisk={setRisk} setCategory={setCategory}
                        setStatus={setStatus} />}
                <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                    <CreateButton onClick={handleCreateVulnerability}>Add new vulnerability</CreateButton>
                </RestrictedComponent>
            </HStack>
        </h4>
        <VulnerabilitiesTable tableModel={tableModel} tableModelSetter={setTableModel}
            vulnerabilities={tableModel.vulnerabilities.filter(vuln => ((vuln.category_name && vuln.category_name.includes(category)) || vuln.category_name === null) && vuln.risk.includes(risk) && vuln.status.includes(status))}
            reloadCallback={reloadVulnerabilities}
        />
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
