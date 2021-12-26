import { ButtonGroup } from '@chakra-ui/button';
import Pagination from 'components/layout/Pagination';
import PageTitle from 'components/logic/PageTitle';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import Breadcrumb from 'components/ui/Breadcrumb';
import DeleteButton from 'components/ui/buttons/Delete';
import Loading from 'components/ui/Loading';
import Title from 'components/ui/Title';
import { actionCompletedToast } from 'components/ui/toast';
import useQuery from 'hooks/useQuery';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import secureApiFetch from '../../services/api';
import CreateButton from '../ui/buttons/Create';
import { IconFlag } from '../ui/Icons';
import VulnerabilitiesTable from './VulnerabilitiesTable';

const VulnerabilitiesList = () => {
    const navigate = useNavigate();
    const query = useQuery();
    let pageNumber = query.get('page');
    pageNumber = pageNumber !== null ? parseInt(pageNumber) : 1;
    const apiPageNumber = pageNumber - 1;

    const [selection, setSelection] = useState([]);

    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [sortBy, setSortBy] = useState({ column: 'insert_ts', order: 'DESC' })
    const [totalCount, setTotalCount] = useState(0);
    const [numberPages, setNumberPages] = useState(1);

    const handlePrev = () => {
        navigate(`/vulnerabilities?isTemplate=false&page=${pageNumber - 1}&orderColumn=${sortBy.column}&orderDirection=${sortBy.order}`);
    }
    const handleNext = () => {
        navigate(`/vulnerabilities?isTemplate=false&page=${pageNumber + 1}&orderColumn=${sortBy.column}&orderDirection=${sortBy.order}`);
    }

    const onSortChange = (ev, column, order) => {
        ev.preventDefault();

        setSortBy({ column: column, order: order });
    }

    const reloadVulnerabilities = useCallback(() => {
        setVulnerabilities([]);

        secureApiFetch(`/vulnerabilities?isTemplate=false&page=${apiPageNumber}&orderColumn=${sortBy.column}&orderDirection=${sortBy.order}`, { method: 'GET' })
            .then(resp => {
                if (resp.headers.has('X-Page-Count')) {
                    setNumberPages(resp.headers.get('X-Page-Count'))
                }
                if (resp.headers.has('X-Total-Count')) {
                    setTotalCount(resp.headers.get('X-Total-Count'))
                }
                return resp.json()
            })
            .then((data) => {
                setVulnerabilities(data);
            });
    }, [apiPageNumber, sortBy]);

    const onDeleteButtonClick = () => {
        secureApiFetch('/vulnerabilities', {
            method: 'PATCH',
            headers: {
                'Bulk-Operation': 'DELETE',
            },
            body: JSON.stringify(selection),
        })
            .then(reloadVulnerabilities)
            .then(() => {
                setSelection([]);
                actionCompletedToast('All selected vulnerabilities were deleted.');
            })
            .catch(err => console.error(err));
    };

    const onAddVulnerabilityClick = () => {
        navigate(`/vulnerabilities/create`)
    }

    useEffect(() => {
        reloadVulnerabilities()
    }, [reloadVulnerabilities])

    return (
        <>
            <PageTitle value={`Vulnerabilities - Page ${pageNumber}`} />
            <div className='heading'>
                <Breadcrumb />
                <Pagination page={apiPageNumber} total={numberPages} handlePrev={handlePrev} handleNext={handleNext} />
                <ButtonGroup>
                    <CreateButton onClick={onAddVulnerabilityClick}>Add vulnerability</CreateButton>
                    <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                        <DeleteButton onClick={onDeleteButtonClick} disabled={!selection.length}>
                            Delete selected
                        </DeleteButton>
                    </RestrictedComponent>
                </ButtonGroup>
            </div>
            {!vulnerabilities && <Title title='Vulnerabilities' icon={<IconFlag />} />}
            {!vulnerabilities ? <Loading /> : <>
                <Title title={`Vulnerabilities (${totalCount})`} icon={<IconFlag />} />
                <VulnerabilitiesTable vulnerabilities={vulnerabilities} onSortChange={onSortChange} selection={selection} setSelection={setSelection} reloadCallback={reloadVulnerabilities} />
            </>}
        </>
    )
}

export default VulnerabilitiesList;
