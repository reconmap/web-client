import PageTitle from 'components/logic/PageTitle';
import CreateButton from 'components/ui/buttons/Create';
import { useNavigate } from 'react-router-dom';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import { IconFolder } from '../ui/Icons';
import Loading from '../ui/Loading';
import Title from '../ui/Title';
import DocumentsTable from './Table';

const DocumentsListPage = () => {
    const navigate = useNavigate();
    const [documents, fetchDocuments] = useFetch('/documents')
    const destroy = useDelete('/documents/', fetchDocuments);

    const onAddCommandClick = ev => {
        ev.preventDefault();

        navigate('/documents/add');
    }

    return <div>
        <PageTitle value="Documents" />
        <div className='heading'>
            <Breadcrumb />
            <CreateButton onClick={onAddCommandClick}>Create document</CreateButton>
        </div>
        <Title title="Documents" icon={<IconFolder />} />
        {!documents ? <Loading /> : <DocumentsTable documents={documents} onDeleteButtonClick={destroy} />}
    </div>
}

export default DocumentsListPage;
