import PageTitle from 'components/logic/PageTitle';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import ButtonGroup from 'components/ui/buttons/ButtonGroup';
import DeleteButton from 'components/ui/buttons/Delete';
import { actionCompletedToast } from 'components/ui/toast';
import useQuery from 'hooks/useQuery';
import React, { useCallback, useEffect, useState } from 'react';
import secureApiFetch from '../../services/api';
import Pagination from '../layout/Pagination';
import Breadcrumb from "../ui/Breadcrumb";
import CreateButton from '../ui/buttons/Create';
import { IconFlag } from '../ui/Icons';
import Loading from '../ui/Loading';
import Title from '../ui/Title';
import VulnerabilitiesTable from './VulnerabilitiesTable';

const VulnerabilitiesList = ({ history }) => {
    const query = useQuery();
    let pageNumber = query.get('page');
    pageNumber = pageNumber !== null ? parseInt(pageNumber) : 1;
    const apiPageNumber = pageNumber - 1;

    const [selection, setSelection] = useState([]);

    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [numberPages, setNumberPages] = useState(1);

    const handlePrev = () => {
        history.push(`/vulnerabilities?isTemplate=false&page=${pageNumber - 1}`);
    }
    const handleNext = () => {
        history.push(`/vulnerabilities?isTemplate=false&page=${pageNumber + 1}`);
    }

    const reloadVulnerabilities = useCallback(() => {
        setVulnerabilities([]);

        secureApiFetch(`/vulnerabilities?isTemplate=false&page=${apiPageNumber}`, { method: 'GET' })
            .then(resp => {
                if (resp.headers.has('X-Page-Count')) {
                    setNumberPages(resp.headers.get('X-Page-Count'))
                }
                return resp.json()
            })
            .then((data) => {
                setVulnerabilities(data);
            });
    }, [apiPageNumber]);

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

    useEffect(() => {
        reloadVulnerabilities()
    }, [reloadVulnerabilities])

    const onAddVulnerabilityClick = () => {
        history.push(`/vulnerabilities/create`)
    }

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
            <Title title='Vulnerabilities' icon={<IconFlag />} />
            {!vulnerabilities ? <Loading /> :
                <VulnerabilitiesTable vulnerabilities={vulnerabilities} selection={selection} setSelection={setSelection} reloadCallback={reloadVulnerabilities} />
            }
        </>
    )
}

export default VulnerabilitiesList;
