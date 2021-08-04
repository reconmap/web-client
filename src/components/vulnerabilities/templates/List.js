import VulnerabilityBadge from 'components/badges/VulnerabilityBadge';
import VulnerabilityCategoryBadge from 'components/badges/VulnerabilityCategoryBadge';
import PageTitle from 'components/logic/PageTitle';
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
import { Link } from 'react-router-dom';
import secureApiFetch from 'services/api';

const TemplatesList = ({ history }) => {
    const [templates, updateTemplates] = useFetch('/vulnerabilities?isTemplate=1')

    const cloneVulnerability = (ev, templateId) => {
        ev.stopPropagation();

        secureApiFetch(`/vulnerabilities/${templateId}/clone`, { method: 'POST' })
            .then(resp => resp.json())
            .then(data => {
                history.push(`/vulnerabilities/${data.vulnerabilityId}/edit`);
            });
    }

    const viewTemplate = (templateId) => {
        history.push(`/vulnerabilities/templates/${templateId}`);
    }

    const destroy = useDelete('/vulnerabilities/', updateTemplates);

    const deleteTemplate = (ev, templateId) => {
        ev.stopPropagation();

        destroy(templateId);
    }

    const onAddVulnerabilityTemplateClick = () => {
        history.push(`/vulnerabilities/create?isTemplate=true`)
    }

    return (
        <>
            <PageTitle value="Vulnerability templates" />
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/vulnerabilities">Vulnerabilities</Link>
                </Breadcrumb>

                <CreateButton onClick={onAddVulnerabilityTemplateClick}>Add vulnerability template</CreateButton>
            </div>
            <Title title='Vulnerability templates' icon={<IconDocumentDuplicate />} />
            {!templates ? <Loading /> :
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '190px' }}>Summary</th>
                            <th>Category</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {templates.length === 0 ?
                            <td colSpan="3"><NoResults /></td>
                            :
                            templates.map((template) =>
                                <tr key={template.id} onClick={() => viewTemplate(template.id)}>
                                    <td><VulnerabilityBadge vulnerability={template} /></td>
                                    <td><VulnerabilityCategoryBadge category={template.category_name} /></td>
                                    <td className='flex justify-end'>
                                        <PrimaryButton onClick={ev => cloneVulnerability(ev, template.id)} key={template.id}
                                            title="Clone"><IconPlus />Clone and edit</PrimaryButton>
                                        <LinkButton href={`/vulnerabilities/${template.id}/edit`}>Edit</LinkButton>
                                        <DeleteIconButton onClick={ev => deleteTemplate(ev, template.id)} />
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            }
        </>
    )
}

export default TemplatesList;
