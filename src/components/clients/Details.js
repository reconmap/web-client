import { ButtonGroup, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import PageTitle from 'components/logic/PageTitle';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import ProjectsTable from 'components/projects/Table';
import MailLink from "components/ui/MailLink";
import TelephoneLink from "components/ui/TelephoneLink";
import TimestampsSection from 'components/ui/TimestampsSection';
import UserLink from 'components/users/Link';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from "../ui/Breadcrumb";
import DeleteButton from '../ui/buttons/Delete';
import EditButton from "../ui/buttons/Edit";
import ExternalLink from "../ui/ExternalLink";
import { IconBriefcase } from '../ui/Icons';
import Title from '../ui/Title';
import useDelete from './../../hooks/useDelete';
import useFetch from './../../hooks/useFetch';
import Loading from './../ui/Loading';
import secureApiFetch from '../../services/api';
import { useEffect, useState } from 'react';

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
    const { clientId } = useParams();
    const navigate = useNavigate();

    const [client] = useFetch(`/clients/${clientId}`)
    const deleteClient = useDelete(`/clients/`)
    const [logo, setLogo] = useState(null);
    const [smallLogo, setSmallLogo] = useState(null);

    const handleDelete = async () => {
        const confirmed = await deleteClient(clientId);
        if (confirmed)
            navigate('/clients');
    }

    useEffect(() => {
        if (client) {
            if (client.small_logo_attachment_id)
            {
                downloadAndDisplayLogo(client.small_logo_attachment_id, 'small_logo');
            }

            if (client.logo_attachment_id)
            {
                downloadAndDisplayLogo(client.logo_attachment_id, 'logo');
            }
        }
    }, [client]);

    const downloadAndDisplayLogo = (logoId, type) => {
        secureApiFetch(`/attachments/${logoId}`, { method: 'GET', headers: {} })
            .then(resp => {
                const contentDispositionHeader = resp.headers.get('Content-Disposition');
                const filenameRe = new RegExp(/filename="(.*)";/)
                const filename = filenameRe.exec(contentDispositionHeader)[1]
                return Promise.all([resp.blob(), filename]);
            })
            .then((values) => {
                const blob = values[0];
                const url = URL.createObjectURL(blob);
                if (type === 'small_logo') {
                    setSmallLogo(url);
                } else {
                    setLogo(url);
                }
            })
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
                        navigate(`/clients/${client.id}/edit`)
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
                                    <dt>Address</dt>
                                    <dd>{client.address ?? '-'}</dd>

                                    <dt>URL</dt>
                                    <dd><ExternalLink href={client.url}>{client.url}</ExternalLink></dd>

                                    <dt>Contact name</dt>
                                    <dd>{client.contact_name}</dd>

                                    <dt>Contact email</dt>
                                    <dd><MailLink email={client.contact_email} /></dd>

                                    <dt>Contact phone</dt>
                                    <dd><TelephoneLink number={client.contact_phone} /></dd>

                                    <dt>Main Logo</dt>
                                    <dd><img src={logo} alt="The main logo"/></dd>

                                    <dt>Small Logo</dt>
                                    <dd><img src={smallLogo} alt="The smaller version of the logo"/></dd>
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
