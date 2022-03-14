import PageTitle from 'components/logic/PageTitle';
import CreateButton from 'components/ui/buttons/Create';
import { useNavigate } from 'react-router-dom';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import { IconFolder } from '../ui/Icons';
import Title from '../ui/Title';
import CommandsTable from './Table';

const CommandsListPage = () => {
    const navigate = useNavigate();
    const [commands, updateCommands] = useFetch('/commands')
    const destroy = useDelete('/commands/', updateCommands);

    const onAddCommandClick = ev => {
        ev.preventDefault();

        navigate('/commands/add');
    }

    return <div>
        <PageTitle value="Commands" />
        <div className='heading'>
            <Breadcrumb />
            <CreateButton onClick={onAddCommandClick}>Add command</CreateButton>
        </div>
        <Title title='Commands' icon={<IconFolder />} />
        <CommandsTable commands={commands} onDeleteCallback={destroy} />
    </div>
}


export default CommandsListPage;
