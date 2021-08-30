import { ButtonGroup, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import PageTitle from 'components/logic/PageTitle';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import ProjectsTable from 'components/projects/Table';
import EmptyField from 'components/ui/EmptyField';
import TimestampsSection from 'components/ui/TimestampsSection';
import UserLink from 'components/users/Link';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import Breadcrumb from "../ui/Breadcrumb";
import DeleteButton from '../ui/buttons/Delete';
import EditButton from "../ui/buttons/Edit";
import ExternalLink from "../ui/ExternalLink";
import { IconBriefcase } from '../ui/Icons';
import Title from '../ui/Title';
import useDelete from './../../hooks/useDelete';
import useFetch from './../../hooks/useFetch';
import Loading from './../ui/Loading';

const ClientProjectsTab = ({ clientId }) => {
    const [projects] = useFetch(`/projects?clientId=${clientId}`);

    if (!projects) return <Loading />

    if (projects.length === 0) {
        return <div>
            This client has no projects. You can see all projects and their clients <Link to="/projects">here</Link>.
        </div>
    }

    return <div>
        <ProjectsTable projects={projects} showClientColumn={false} />
    </div>
}

const ClientDetails = () => {
    const { params: { clientId } } = useRouteMatch()
    const history = useHistory()

    const [client] = useFetch(`/clients/${clientId}`)
    const deleteClient = useDelete(`/clients/`)

    const handleDelete = async () => {
        const confirmed = await deleteClient(clientId);
        if (confirmed)
            history.push('/clients');
    }

    if (!client) {
        return <Loading />
    }

    return <div>
        <div className='heading'>
            <Breadcrumb>
                <Link to="/clients">Clients</Link>
            </Breadcrumb>
            <ButtonGroup>
                <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                    <EditButton onClick={(ev) => {
                        ev.preventDefault();
                        history.push(`/clients/${client.id}/edit`)
                    }}>Edit</EditButton>
                    <DeleteButton onClick={handleDelete} />
                </RestrictedComponent>
            </ButtonGroup>
        </div>
        <article>
            <div>
                <PageTitle value={`${client.name} client`} />
                <Title type='Client' title={client.name} icon={<IconBriefcase />} />
            </div>

            <Tabs isLazy>
                <TabList>
                    <Tab>Details</Tab>
                    <Tab>Projects</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div className="grid grid-two">
                            <div>
                                <h4>Properties</h4>

                                <dl>
                                    <dt>URL</dt>
                                    <dd><ExternalLink href={client.url}>{client.url}</ExternalLink></dd>

                                    <dt>Contact name</dt>
                                    <dd>{client.contact_name}</dd>

                                    <dt>Contact email</dt>
                                    <dd><a href={`mailto:${client.contact_email}`}>{client.contact_email}</a></dd>

                                    <dt>Contact phone</dt>
                                    <dd>{client.contact_phone ? <a href={`tel:${client.contact_phone}`}>{client.contact_phone}</a> : <EmptyField />}</dd>
                                </dl>
                            </div>

                            <div>
                                <h4>Relations</h4>
                                <dl>
                                    <dt>Created by</dt>
                                    <dd><UserLink userId={client.creator_uid}>{client.creator_full_name}</UserLink></dd>
                                </dl>

                                <TimestampsSection entity={client} />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel >
                        <ClientProjectsTab clientId={clientId} />
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </article>
    </div>
}

export default ClientDetails;
