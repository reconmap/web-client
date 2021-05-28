import VulnerabilityBadge from 'components/badges/VulnerabilityBadge';
import VulnerabilityCategoryBadge from 'components/badges/VulnerabilityCategoryBadge';
import Breadcrumb from 'components/ui/Breadcrumb';
import CreateButton from 'components/ui/buttons/Create';
import DeleteButton from 'components/ui/buttons/Delete';
import PrimaryButton from 'components/ui/buttons/Primary';
import { IconDocumentDuplicate, IconPlus } from 'components/ui/Icons';
import Loading from 'components/ui/Loading';
import NoResults from 'components/ui/NoResults';
import Title from 'components/ui/Title';
import useDelete from 'hooks/useDelete';
import useFetch from 'hooks/useFetch';
import useSetTitle from 'hooks/useSetTitle';
import { Link } from 'react-router-dom';
import secureApiFetch from 'services/api';

const TemplatesList = ({ history }) => {
    useSetTitle('Vulnerability templates');
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

    return (
        <>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/vulnerabilities">Vulnerabilities</Link>
                    <Link to="/vulnerabilities/templates">Templates</Link>
                </Breadcrumb>

                <CreateButton onClick={() => history.push('/system/import-data')}>Import template(s)</CreateButton>
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
                                        <DeleteButton onClick={ev => deleteTemplate(ev, template.id)} />
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
