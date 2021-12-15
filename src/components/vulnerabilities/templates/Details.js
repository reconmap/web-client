import { ButtonGroup, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import PageTitle from 'components/logic/PageTitle';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import Breadcrumb from 'components/ui/Breadcrumb';
import DeleteButton from 'components/ui/buttons/Delete';
import LinkButton from 'components/ui/buttons/Link';
import PrimaryButton from 'components/ui/buttons/Primary';
import { IconFlag, IconPlusCircle } from 'components/ui/Icons';
import Loading from 'components/ui/Loading';
import Title from 'components/ui/Title';
import useDelete from 'hooks/useDelete';
import useFetch from 'hooks/useFetch';
import { Link, Redirect, useHistory } from 'react-router-dom';
import secureApiFetch from 'services/api';
import VulnerabilityDescriptionPanel from '../VulnerabilityDescriptionPanel';
import VulnerabilityRemediationPanel from '../VulnerabilityRemediationPanel';


const VulnerabilityTemplateDetails = ({ match }) => {
    const history = useHistory();
    const [vulnerability] = useFetch(`/vulnerabilities/${match.params.templateId}`)

    const cloneProject = async (templateId) => {
        secureApiFetch(`/vulnerabilities/${templateId}/clone`, { method: 'POST' })
            .then(resp => resp.json())
            .then(data => {
                history.push(`/vulnerabilities/${data.vulnerabilityId}/edit`);
            });
    }

    const destroy = useDelete('/vulnerabilities/', () => {
        history.push('/vulnerabilities/templates');
    });

    if (!vulnerability) return <Loading />

    if (vulnerability && !vulnerability.is_template) {
        return <Redirect to={`/vulnerabilities/${vulnerability.id}`} />
    }

    return (
        <>
            <div>
                <div className='heading'>
                    <Breadcrumb>
                        <Link to="/vulnerabilities">Vulnerabilities</Link>
                        <Link to="/vulnerabilities/templates">Templates</Link>
                    </Breadcrumb>
                    <ButtonGroup>
                        <PrimaryButton onClick={() => cloneProject(vulnerability.id)}><IconPlusCircle
                        /> Clone and edit</PrimaryButton>

                        <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                            <LinkButton href={`/vulnerabilities/${vulnerability.id}/edit`}>Edit</LinkButton>
                            <DeleteButton onClick={() => destroy(vulnerability.id)} />
                        </RestrictedComponent>
                    </ButtonGroup>
                </div>
                <article>
                    <PageTitle value={`${vulnerability.summary} vulnerability template`} />

                    <Title type='Vulnerability template' title={vulnerability.summary} icon={<IconFlag />} />

                    <Tabs>
                        <TabList>
                            <Tab>Description</Tab>
                            <Tab>Remediation</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <VulnerabilityDescriptionPanel vulnerability={vulnerability} />
                            </TabPanel>
                            <TabPanel>
                                <VulnerabilityRemediationPanel vulnerability={vulnerability} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </article>
            </div>
        </>
    )
}

export default VulnerabilityTemplateDetails;
