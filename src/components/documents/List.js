import PageTitle from 'components/logic/PageTitle';
import CreateButton from 'components/ui/buttons/Create';
import { useHistory } from 'react-router-dom';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import { IconFolder } from '../ui/Icons';
import Loading from '../ui/Loading';
import Title from '../ui/Title';
import DocumentsTable from './Table';

const DocumentsListPage = () => {
    const history = useHistory();
    const [commands, updateCommands] = useFetch('/documents')
    const destroy = useDelete('/documents/', updateCommands);

    const onAddCommandClick = ev => {
        ev.preventDefault();

        history.push('/documents/add');
    }

    return <div>
        <PageTitle value="Documents" />
        <div className='heading'>
            <Breadcrumb />
            <CreateButton onClick={onAddCommandClick}>Create document</CreateButton>
        </div>
        <Title title="Documents" icon={<IconFolder />} />
        {!commands ? <Loading /> : <DocumentsTable documents={commands} onDeleteButtonClick={destroy} />}
    </div>
}

export default DocumentsListPage;
