import ButtonGroup from 'components/ui/buttons/ButtonGroup';
import ReloadButton from 'components/ui/buttons/Reload';
import React, { useCallback, useEffect, useState } from 'react';
import useDelete from '../../hooks/useDelete';
import secureApiFetch from '../../services/api';
import Pagination from '../layout/Pagination';
import Breadcrumb from "../ui/Breadcrumb";
import CreateButton from '../ui/buttons/Create';
import { IconFlag } from '../ui/Icons';
import Loading from '../ui/Loading';
import Title from '../ui/Title';
import useSetTitle from './../../hooks/useSetTitle';
import VulnerabilitiesTable from './VulnerabilitiesTable';

const VulnerabilitiesList = ({ history }) => {
    const searchParams = new URLSearchParams(history.location.search);
    let pageNumber = searchParams.get('page');
    pageNumber = pageNumber !== null ? parseInt(pageNumber) : 1;
    const apiPageNumber = pageNumber - 1;

    const [reloadButtonDisabled, setReloadButtonDisabled] = useState(false);

    useSetTitle(`Vulnerabilities - Page ${pageNumber}`)

    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [numberPages, setNumberPages] = useState(1);

    const handlePrev = () => {
        history.push(`/vulnerabilities?page=${pageNumber - 1}`);
    }
    const handleNext = () => {
        history.push(`/vulnerabilities?page=${pageNumber + 1}`);
    }

    const reloadVulnerabilities = useCallback(() => {
        setVulnerabilities([]);
        setReloadButtonDisabled(true);

        secureApiFetch(`/vulnerabilities?page=${apiPageNumber}`, { method: 'GET' })
            .then(resp => {
                if (resp.headers.has('X-Page-Count')) {
                    setNumberPages(resp.headers.get('X-Page-Count'))
                }
                return resp.json()
            })
            .then((data) => {
                setVulnerabilities(data);
            })
            .finally(() => {
                setReloadButtonDisabled(false);
            });
    }, [apiPageNumber]);

    useEffect(() => {
        reloadVulnerabilities()
    }, [reloadVulnerabilities])

    const destroy = useDelete('/vulnerabilities/', reloadVulnerabilities, 'Do you really want to delete this vulnerability?', 'The vulnerability has been deleted.');
    const handleCreateVulnerability = () => {
        history.push(`/vulnerabilities/create`)
    }

    return (
        <>
            <div className='heading'>
                <Breadcrumb />
                <Pagination page={apiPageNumber} total={numberPages} handlePrev={handlePrev} handleNext={handleNext} />
                <ButtonGroup>
                    <CreateButton onClick={handleCreateVulnerability}>Add vulnerability</CreateButton>
                    <ReloadButton onClick={reloadVulnerabilities} disabled={reloadButtonDisabled} />
                </ButtonGroup>
            </div>
            <Title title='Vulnerabilities' icon={<IconFlag />} />
            {!vulnerabilities ? <Loading /> :
                <VulnerabilitiesTable vulnerabilities={vulnerabilities} destroy={destroy} />
            }
        </>
    )
}

export default VulnerabilitiesList
