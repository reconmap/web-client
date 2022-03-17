import { Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import PageTitle from 'components/logic/PageTitle';
import Breadcrumb from 'components/ui/Breadcrumb';
import CreateButton from 'components/ui/buttons/Create';
import DeleteIconButton from 'components/ui/buttons/DeleteIconButton';
import LinkButton from 'components/ui/buttons/Link';
import { IconDocumentDuplicate } from 'components/ui/Icons';
import Loading from 'components/ui/Loading';
import NoResults from 'components/ui/NoResults';
import Title from 'components/ui/Title';
import useDelete from 'hooks/useDelete';
import useFetch from 'hooks/useFetch';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import VulnerabilityCategoryAddModalDialog from './AddModalDialog';
import VulnerabilityCategoryEditModalDialog from './EditModalDialog';

const VulnerabilityCategoriesPage = () => {
    const [categories, fetchParentCategories] = useFetch('/vulnerabilities/categories?parentsOnly=0')
    
    const destroy = useDelete('/vulnerabilities/categories/', fetchParentCategories);

    const [editCategory, setEditCategory] = useState({});

    const { isOpen: isAddCategoryDialogOpen, onOpen: openAddCategoryDialog, onClose: closeAddCategoryDialog } = useDisclosure();
    const { isOpen: isEditCategoryDialogOpen, onOpen: openEditCategoryDialog, onClose: closeEditCategoryDialog } = useDisclosure();

    const onCategoryDialogClosed = () => {
        fetchParentCategories();

        closeAddCategoryDialog();
        closeEditCategoryDialog();
    }

    const onAddClick = ev => {
        ev.preventDefault();

        openAddCategoryDialog();
    }

    const onEditClick = (ev, ccategory) => {
        ev.preventDefault();

        setEditCategory(ccategory);
        openEditCategoryDialog();
    }

    const onDeleteClick = (ev, templateId) => {
        ev.stopPropagation();

        destroy(templateId);
    }

    return <>
        <PageTitle value="Vulnerability categories" />
        <div className='heading'>
            <Breadcrumb>
                <Link to="/vulnerabilities">Vulnerabilities</Link>
            </Breadcrumb>

            <VulnerabilityCategoryAddModalDialog isOpen={isAddCategoryDialogOpen} onClose={onCategoryDialogClosed} onCancel={closeAddCategoryDialog} />
            {isEditCategoryDialogOpen && <VulnerabilityCategoryEditModalDialog category={editCategory} isOpen={isEditCategoryDialogOpen} onClose={onCategoryDialogClosed} onCancel={closeEditCategoryDialog} />}
            <CreateButton onClick={onAddClick}>Add vulnerability category...</CreateButton>
        </div>
        <Title title='Vulnerability categories' icon={<IconDocumentDuplicate />} />
        {!categories ? <Loading /> :
            <Table>
                <Thead>
                    <Tr>
                        <Th style={{ width: '190px' }}>Name</Th>
                        <Th>Parent category</Th>
                        <Th colSpan={2}>Description</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {categories.length === 0 ?
                        <Tr><Td colSpan={3}><NoResults /></Td></Tr>
                        :
                        categories.map(category =>
                            <Tr key={category.id}>
                                <Td><strong>{category.name}</strong></Td>
                                <Td>{category.parent_name ?? '-'}</Td>
                                <Td>{category.description}</Td>
                                <Td className='flex justify-end'>
                                    <LinkButton href="#" onClick={ev => onEditClick(ev, category)}>Edit</LinkButton>
                                    <DeleteIconButton onClick={ev => onDeleteClick(ev, category.id)} />
                                </Td>
                            </Tr>
                        )
                    }
                </Tbody>
            </Table>
        }
    </>
}

export default VulnerabilityCategoriesPage;
