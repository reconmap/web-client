import { Flex, Spacer } from '@chakra-ui/react';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import CreateButton from 'components/ui/buttons/Create';
import VulnerabilityFilters from 'components/vulnerabilities/Filters';
import VulnerabilityTableModel from 'components/vulnerabilities/VulnerabilityTableModel';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import secureApiFetch from 'services/api';
import VulnerabilitiesTable from '../vulnerabilities/VulnerabilitiesTable';

const ProjectVulnerabilities = ({ project }) => {
    const [tableModel, setTableModel] = useState(new VulnerabilityTableModel())

    const navigate = useNavigate();

    const fetchVulnerabilities = useCallback(() => {
        const queryParams = new URLSearchParams();
        queryParams.set('projectId', project.id);
        queryParams.set('orderColumn', tableModel.sortBy.column);
        queryParams.set('orderDirection', tableModel.sortBy.order);
        Object.keys(tableModel.filters)
            .forEach(key => tableModel.filters[key] !== null && tableModel.filters[key].length !== 0 && queryParams.append(key, tableModel.filters[key]));
        const url = `/vulnerabilities?${queryParams.toString()}`;
        secureApiFetch(url, { method: 'GET' })
            .then(resp => resp.json())
            .then(data => {
                setTableModel(tableModel => ({ ...tableModel, vulnerabilities: data }));
            })
    }, [tableModel.filters, tableModel.sortBy, project])

    const handleCreateVulnerability = () => {
        navigate(`/vulnerabilities/create?projectId=${project.id}`)
    }

    useEffect(() => {
        fetchVulnerabilities();
    }, [fetchVulnerabilities, tableModel.filters]);

    return <section>
        <Flex>
            <VulnerabilityFilters tableModel={tableModel} tableModelSetter={setTableModel} showProjectFilter={false} />
            <Spacer />
            <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                <CreateButton onClick={handleCreateVulnerability}>Add new vulnerability</CreateButton>
            </RestrictedComponent>
        </Flex>
        <VulnerabilitiesTable tableModel={tableModel} tableModelSetter={setTableModel} reloadCallback={fetchVulnerabilities} showProjectColumn={false} showSelection={false} />
    </section >
}

export default ProjectVulnerabilities;
