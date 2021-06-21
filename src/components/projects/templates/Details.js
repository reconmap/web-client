import PageTitle from 'components/logic/PageTitle';
import Breadcrumb from 'components/ui/Breadcrumb';
import ButtonGroup from 'components/ui/buttons/ButtonGroup';
import DeleteButton from 'components/ui/buttons/Delete';
import LinkButton from 'components/ui/buttons/Link';
import PrimaryButton from 'components/ui/buttons/Primary';
import { IconFolder, IconPlusCircle } from 'components/ui/Icons';
import Loading from 'components/ui/Loading';
import TimestampsSection from 'components/ui/TimestampsSection';
import Title from 'components/ui/Title';
import useDelete from 'hooks/useDelete';
import useFetch from 'hooks/useFetch';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import secureApiFetch from 'services/api';

const TemplateDetails = ({ history, match }) => {
    const [template] = useFetch(`/projects/${match.params.templateId}`)
    const [tasks] = useFetch(`/projects/${match.params.templateId}/tasks`)

    const cloneProject = async (templateId) => {
        secureApiFetch(`/projects/${templateId}/clone`, { method: 'POST' })
            .then(resp => resp.json())
            .then(data => {
                history.push(`/projects/${data.projectId}/edit`);
            });
    }

    const destroy = useDelete('/projects/', () => {
        history.push('/projects/templates');
    });

    return (
        <>
            <PageTitle value="Projects templates" />
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                    <Link to="/projects/templates">Templates</Link>
                </Breadcrumb>
                {template &&
                    <ButtonGroup>
                        <PrimaryButton onClick={() => cloneProject(template.id)}><IconPlusCircle
                        /> Create project from template</PrimaryButton>
                        <LinkButton href={`/projects/${template.id}/edit`}>Edit</LinkButton>
                        <DeleteButton onClick={() => destroy(template.id)} />
                    </ButtonGroup>
                }
            </div>
            {(!template) ?
                <Loading /> :
                <article>
                    <Title title={template.name} type='Project template' icon={<IconFolder />} />

                    <div className="grid grid-two">
                        <div>
                            <h4>Description</h4>
                            <ReactMarkdown>{template.description}</ReactMarkdown>
                            <h4>Tasks</h4>
                            {tasks && tasks.map((task, index) =>
                                <>&#10003; {task.summary}<br /></>
                            )}
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
