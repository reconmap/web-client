import Breadcrumb from 'components/ui/Breadcrumb';
import ButtonGroup from 'components/ui/buttons/ButtonGroup';
import DeleteButton from 'components/ui/buttons/Delete';
import LinkButton from 'components/ui/buttons/Link';
import PrimaryButton from 'components/ui/buttons/Primary';
import { IconPlusCircle } from 'components/ui/Icons';
import Loading from 'components/ui/Loading';
import TimestampsSection from 'components/ui/TimestampsSection';
import Title from 'components/ui/Title';
import useDelete from 'hooks/useDelete';
import useFetch from 'hooks/useFetch';
import useSetTitle from 'hooks/useSetTitle';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import secureApiFetch from 'services/api';


const TemplateDetails = ({ history, match }) => {
    useSetTitle('Vulnerability template');
    const [template] = useFetch(`/vulnerabilities/${match.params.templateId}`)

    const cloneProject = async (templateId) => {
        secureApiFetch(`/vulnerabilities/${templateId}/clone`, { method: 'POST' })
            .then(resp => resp.json())
            .then(data => {
                history.push(`/vulnerabilities/${data.projectId}/edit`);
            });
    }

    const destroy = useDelete('/vulnerabilities/', () => {
        history.push('/vulnerabilities/templates');
    });

    return (
        <>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/vulnerabilities">Vulnerabilities</Link>
                    <Link to="/vulnerabilities/templates">Templates</Link>
                </Breadcrumb>
                {template &&
                    <ButtonGroup>
                        <PrimaryButton onClick={() => cloneProject(template.id)}><IconPlusCircle
                        /> Add to project</PrimaryButton>
                        <LinkButton href={`/vulnerabilities/${template.id}/edit`}>Edit</LinkButton>
                        <DeleteButton onClick={() => destroy(template.id)} />
                    </ButtonGroup>
                }
            </div>
            {(!template) ?
                <Loading /> :
                <article>
                    <Title title={template.summary} type='Vulnerability template' />

                    <div className="grid grid-two">
                        <div>
                            <h4>Description</h4>
                            <ReactMarkdown>{template.description}</ReactMarkdown>
                        </div>

                        <div>
                            <TimestampsSection entity={template} />
                        </div>
                    </div>
                </article>}
        </>
    )
}

export default TemplateDetails;
