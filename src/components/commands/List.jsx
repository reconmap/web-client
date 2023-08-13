import { ButtonGroup, IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PaginationV2 from 'components/layout/PaginationV2';
import PageTitle from 'components/logic/PageTitle';
import CreateButton from 'components/ui/buttons/Create';
import ExportMenuItem from 'components/ui/menuitems/ExportMenuItem';
import useQuery from 'hooks/useQuery';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import secureApiFetch from 'services/api';
import useDelete from '../../hooks/useDelete';
import Breadcrumb from '../ui/Breadcrumb';
import { IconFolder } from '../ui/Icons';
import Title from '../ui/Title';
import CommandsTable from './Table';

const CommandsListPage = () => {
    const navigate = useNavigate();
    const query = useQuery();
    let pageNumber = query.get('page');
    pageNumber = pageNumber !== null ? parseInt(pageNumber) : 1;
    const apiPageNumber = pageNumber - 1;

    const [numberPages, setNumberPages] = useState(1);
    const [totalCount, setTotalCount] = useState('?');

    const [commands, setCommands] = useState([]);

    const onAddCommandClick = ev => {
        ev.preventDefault();

        navigate('/commands/add');
    }

    const onPageChange = pageNumber => {
        const queryParams = new URLSearchParams();
        queryParams.set('page', pageNumber + 1);
        const url = `/commands?${queryParams.toString()}`;
        navigate(url);
    }

    const reloadCommands = useCallback(() => {
        setCommands(null);

        const queryParams = new URLSearchParams();
        queryParams.set('page', apiPageNumber);
        const url = `/commands?${queryParams.toString()}`;

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
            .then(commands => {
                setCommands(commands);
            });
    }, [setCommands, apiPageNumber]);

    const destroy = useDelete('/commands/', reloadCommands);

    useEffect(() => {
        reloadCommands()
    }, [reloadCommands])

    return <div>
        <PageTitle value="Commands" />
        <div className='heading'>
            <Breadcrumb />
            <PaginationV2 page={apiPageNumber} total={numberPages} onPageChange={onPageChange} />

            <ButtonGroup isAttached>
                <CreateButton onClick={onAddCommandClick}>Add command</CreateButton>
                <Menu>
                    <MenuButton as={IconButton} aria-label='Options' icon={<FontAwesomeIcon icon={faEllipsis} />} variant='outline' />
                    <MenuList>
                        <ExportMenuItem entity="commands" />
                    </MenuList>
                </Menu>
            </ButtonGroup>
        </div>
        <Title title={`Commands (${totalCount})`} icon={<IconFolder />} />
        <CommandsTable commands={commands} onDeleteCallback={destroy} />
    </div>
}


export default CommandsListPage;
