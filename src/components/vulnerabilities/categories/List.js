import { useDisclosure } from '@chakra-ui/react';
import PageTitle from 'components/logic/PageTitle';
import Breadcrumb from 'components/ui/Breadcrumb';
import CreateButton from 'components/ui/buttons/Create';
import DeleteIconButton from 'components/ui/buttons/DeleteIconButton';
import { IconDocumentDuplicate } from 'components/ui/Icons';
import Loading from 'components/ui/Loading';
import NoResults from 'components/ui/NoResults';
import Title from 'components/ui/Title';
import useDelete from 'hooks/useDelete';
import useFetch from 'hooks/useFetch';
import { Link } from 'react-router-dom';
import VulnerabilityCategoryModalDialog from './ModalDialog';

const VulnerabilityCategoriesPage = () => {
    const [categories, fetchCategories] = useFetch('/vulnerabilities/categories')

    const destroy = useDelete('/vulnerabilities/categories/', fetchCategories);

    const { isOpen: isAddTargetDialogOpen, onOpen: openAddCategoryDialog, onClose: closeAddCategoryDialog } = useDisclosure();

    const onCategoryFormSaved = () => {
        fetchCategories();
        closeAddCategoryDialog();
    }


    const deleteCategory = (ev, templateId) => {
        ev.stopPropagation();

        destroy(templateId);
    }

    return <>
        <PageTitle value="Vulnerability templates" />
        <div className='heading'>
            <Breadcrumb>
                <Link to="/vulnerabilities">Vulnerabilities</Link>
            </Breadcrumb>

            <VulnerabilityCategoryModalDialog isOpen={isAddTargetDialogOpen} onClose={onCategoryFormSaved} onCancel={closeAddCategoryDialog} />
            <CreateButton onClick={openAddCategoryDialog}>Add vulnerability category</CreateButton>
        </div>
        <Title title='Vulnerability categories' icon={<IconDocumentDuplicate />} />
        {!categories ? <Loading /> :
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '190px' }}>Name</th>
                        <th>Description</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length === 0 ?
                        <tr><td colSpan="3"><NoResults /></td></tr>
                        :
                        categories.map(category =>
                            <tr key={category.id}>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td className='flex justify-end'>
                                    <DeleteIconButton onClick={ev => deleteCategory(ev, category.id)} />
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        }
    </>
}

export default VulnerabilityCategoriesPage;
