import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import BadgeOutline from 'components/badges/BadgeOutline';
import PageTitle from 'components/logic/PageTitle';
import ProjectBadge from 'components/projects/ProjectBadge';
import Breadcrumb from 'components/ui/Breadcrumb';
import CreateButton from 'components/ui/buttons/Create';
import DeleteIconButton from 'components/ui/buttons/DeleteIconButton';
import LinkButton from 'components/ui/buttons/Link';
import PrimaryButton from 'components/ui/buttons/Primary';
import { IconDocumentDuplicate, IconPlus } from 'components/ui/Icons';
import Loading from 'components/ui/Loading';
import NoResults from 'components/ui/NoResults';
import Title from 'components/ui/Title';
import useDelete from 'hooks/useDelete';
import useFetch from 'hooks/useFetch';
import { Link, useNavigate } from 'react-router-dom';
import secureApiFetch from 'services/api';

const TemplatesList = () => {
    const navigate = useNavigate();
    const [templates, updateTemplates] = useFetch('/projects?isTemplate=1')

    const cloneProject = (ev, templateId) => {
        ev.stopPropagation();

        secureApiFetch(`/projects/${templateId}/clone`, { method: 'POST' })
            .then(resp => resp.json())
            .then(data => {
                navigate(`/projects/${data.projectId}/edit`);
            });
    }

    const viewProject = (templateId) => {
        navigate(`/projects/templates/${templateId}`);
    }

    const destroy = useDelete('/projects/', updateTemplates);

    const deleteTemplate = (ev, templateId) => {
        ev.stopPropagation();

        destroy(templateId);
    }

    const onAddProjectTemplateClick = () => {
        navigate(`/projects/create?isTemplate=true`)
    }

    return <>
        <PageTitle value="Project templates" />
        <div className='heading'>
            <Breadcrumb>
                <Link to="/projects">Projects</Link>
            </Breadcrumb>

            <CreateButton onClick={onAddProjectTemplateClick}>Add project template</CreateButton>
        </div>
        <Title title='Project templates' icon={<IconDocumentDuplicate />} />
        {!templates ? <Loading /> :
            <Table>
                <Thead>
                    <Tr>
                        <Th style={{ width: '190px' }}>Name</Th>
                        <Th>Description</Th>
                        <Th style={{ width: '16ch' }}>Number of tasks</Th>
                        <Th>&nbsp;</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {templates.length === 0 ?
                        <Td colSpan={4}><NoResults /></Td>
                        :
                        templates.map((template) =>
                            <Tr key={template.id} onClick={() => viewProject(template.id)}>
                                <Td><ProjectBadge project={template} /></Td>
                                <Td>{template.description}</Td>
                                <Td><BadgeOutline>{template.num_tasks}</BadgeOutline></Td>
                                <Td className='flex justify-end'>
                                    <PrimaryButton onClick={ev => cloneProject(ev, template.id)} key={template.id}
                                        title="Clone" leftIcon={<IconPlus />}>Clone and edit</PrimaryButton>
                                    <LinkButton href={`/projects/${template.id}/edit`}>Edit</LinkButton>
                                    <DeleteIconButton onClick={ev => deleteTemplate(ev, template.id)} />
                                </Td>
                            </Tr>
                        )
                    }
                </Tbody>
            </Table>
        }
    </>
}

export default TemplatesList;
