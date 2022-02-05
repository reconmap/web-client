import { ButtonGroup } from '@chakra-ui/button';
import { Flex, HStack } from '@chakra-ui/react';
import Pagination from 'components/layout/Pagination';
import PageTitle from 'components/logic/PageTitle';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import Breadcrumb from 'components/ui/Breadcrumb';
import DeleteButton from 'components/ui/buttons/Delete';
import Title from 'components/ui/Title';
import { actionCompletedToast } from 'components/ui/toast';
import useQuery from 'hooks/useQuery';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import secureApiFetch from '../../services/api';
import CreateButton from '../ui/buttons/Create';
import { IconFlag } from '../ui/Icons';
import VulnerabilityFilters from './Filters';
import VulnerabilitiesTable from './VulnerabilitiesTable';
import VulnerabilityTableModel from './VulnerabilityTableModel';

const VulnerabilitiesList = () => {
    const [tableModel, setTableModel] = useState(new VulnerabilityTableModel())
    const navigate = useNavigate();
    const query = useQuery();
    let pageNumber = query.get('page');
    pageNumber = pageNumber !== null ? parseInt(pageNumber) : 1;
    const apiPageNumber = pageNumber - 1;

    const [totalCount, setTotalCount] = useState('?');
    const [numberPages, setNumberPages] = useState(1);

    const handlePrev = () => {
        const queryParams = new URLSearchParams();
        queryParams.set('isTemplate', 'false');
        queryParams.set('page', pageNumber - 1);
        queryParams.set('orderColumn', tableModel.sortBy.column);
        queryParams.set('orderDirection', tableModel.sortBy.order);
        Object.keys(tableModel.filters)
            .forEach(key => tableModel.filters[key] !== null && tableModel.filters[key].length !== 0 && queryParams.append(key, tableModel.filters[key]));
        const url = `/vulnerabilities?${queryParams.toString()}`;
        navigate(url);
    }
    const handleNext = () => {
        const queryParams = new URLSearchParams();
        queryParams.set('isTemplate', 'false');
        queryParams.set('page', pageNumber + 1);
        queryParams.set('orderColumn', tableModel.sortBy.column);
        queryParams.set('orderDirection', tableModel.sortBy.order);
        Object.keys(tableModel.filters)
            .forEach(key => tableModel.filters[key] !== null && tableModel.filters[key].length !== 0 && queryParams.append(key, tableModel.filters[key]));
        const url = `/vulnerabilities?${queryParams.toString()}`;
        navigate(url);
    }

    const reloadVulnerabilities = useCallback(() => {
        setTableModel(tableModel => ({ ...tableModel, vulnerabilities: null }));

        const queryParams = new URLSearchParams();
        queryParams.set('isTemplate', 'false');
        queryParams.set('page', apiPageNumber);
        queryParams.set('orderColumn', tableModel.sortBy.column);
        queryParams.set('orderDirection', tableModel.sortBy.order);
        Object.keys(tableModel.filters)
            .forEach(key => tableModel.filters[key] !== null && tableModel.filters[key].length !== 0 && queryParams.append(key, tableModel.filters[key]));
        const url = `/vulnerabilities?${queryParams.toString()}`;

        secureApiFetch(url, { method: 'GET' })
            .then(resp => {
                if (resp.headers.has('X-Page-Count')) {
                    setNumberPages(resp.headers.get('X-Page-Count'))
                }
                if (resp.headers.has('X-Total-Count')) {
                    setTotalCount(resp.headers.get('X-Total-Count'))
                }
                return resp.json()
            })
            .then(data => {
                setTableModel(tableModel => ({ ...tableModel, vulnerabilities: data }));
            });
    }, [setTableModel, apiPageNumber, tableModel.filters, tableModel.sortBy.column, tableModel.sortBy.order]);

    const onDeleteButtonClick = () => {
        secureApiFetch('/vulnerabilities', {
            method: 'PATCH',
            headers: {
                'Bulk-Operation': 'DELETE',
            },
            body: JSON.stringify(tableModel.selection),
        })
            .then(reloadVulnerabilities)
            .then(() => {
                setTableModel({ ...tableModel, selection: [] })
                actionCompletedToast('All selected vulnerabilities were deleted.');
            })
            .catch(err => console.error(err));
    };

    const onAddVulnerabilityClick = () => {
        navigate(`/vulnerabilities/create`)
    }

    useEffect(() => {
        reloadVulnerabilities()
    }, [reloadVulnerabilities, tableModel.filters])

    return <>
        <PageTitle value={`Vulnerabilities - Page ${pageNumber}`} />
        <div className='heading'>
            <Breadcrumb />
            <Pagination page={apiPageNumber} total={numberPages} handlePrev={handlePrev} handleNext={handleNext} />
            <HStack>
                <ButtonGroup>
                    <CreateButton onClick={onAddVulnerabilityClick}>Add vulnerability</CreateButton>
                    <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                        <DeleteButton onClick={onDeleteButtonClick} disabled={!tableModel.selection.length}>
                            Delete selected
                        </DeleteButton>
                    </RestrictedComponent>
                </ButtonGroup>
            </HStack>
        </div>
        <Title title={`Vulnerabilities (${totalCount})`} icon={<IconFlag />} />
        <Flex>
            <VulnerabilityFilters tableModel={tableModel} tableModelSetter={setTableModel} />
        </Flex>
        <VulnerabilitiesTable tableModel={tableModel} tableModelSetter={setTableModel} reloadCallback={reloadVulnerabilities} />
    </>
}

export default VulnerabilitiesList;
