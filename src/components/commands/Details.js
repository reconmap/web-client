import { ButtonGroup, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import PageTitle from 'components/logic/PageTitle';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import CommandTerminal from 'components/ui/CommandTerminal';
import EmptyField from 'components/ui/EmptyField';
import ExternalLink from 'components/ui/ExternalLink';
import ShellCommand from 'components/ui/ShellCommand';
import Tags from 'components/ui/Tags';
import TimestampsSection from 'components/ui/TimestampsSection';
import UserLink from 'components/users/Link';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommandService from 'services/command';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from "../ui/Breadcrumb";
import DeleteButton from '../ui/buttons/Delete';
import EditButton from "../ui/buttons/Edit";
import { IconBriefcase } from '../ui/Icons';
import Loading from '../ui/Loading';
import Title from '../ui/Title';
import CommandInstructions from './Instructions';

const CommandDetails = () => {
    const { commandId } = useParams();
    const navigate = useNavigate();

    const [command] = useFetch(`/commands/${commandId}`)
    const deleteClient = useDelete(`/commands/`)

    const handleDelete = async () => {
        const confirmed = await deleteClient(commandId);
        if (confirmed)
            navigate('/commands');
    }

    if (!command) {
        return <Loading />
    }

    return <div>
        <div className='heading'>
            <Breadcrumb>
                <Link to="/commands">Commands</Link>
            </Breadcrumb>
            <ButtonGroup>
                <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                    <EditButton onClick={(ev) => {
                        ev.preventDefault();
                        navigate(`/commands/${command.id}/edit`)
                    }}>Edit</EditButton>
                    <DeleteButton onClick={handleDelete} />
                </RestrictedComponent>
            </ButtonGroup>
        </div>
        <article>
            <div>
                <PageTitle value={`${command.name} command`} />

                <Title type='Command' title={command.name} icon={<IconBriefcase />} />
                <Tags values={command.tags} />
            </div>

            <Tabs>
                <TabList>
                    <Tab>Details</Tab>
                    <Tab>Run instructions</Tab>
                    <Tab>Terminal</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div className="grid grid-two">
                            <div>
                                <dl>
                                    <dt>Description</dt>
                                    <dd>{command.description ? <ReactMarkdown>{command.description}</ReactMarkdown> : <EmptyField />}</dd>

                                    {command.output_parser && <>
                                        <dt>Output parser support</dt>
                                        <dl>Yes ({command.output_parser})</dl>
                                    </>}
                                    {command.more_info_url && <>
                                        <dt>More information URL</dt>
                                        <dl>{command.more_info_url ? <ExternalLink href={command.more_info_url}>{command.more_info_url}</ExternalLink> : <EmptyField />}</dl>
                                    </>}

                                    {command.executable_path && <>
                                        <dt>Command line example</dt>
                                        <dd>
                                            <ShellCommand>{CommandService.generateEntryPoint(command)} {CommandService.renderArguments(command)}</ShellCommand>
                                        </dd>
                                    </>}
                                </dl>
                            </div>

                            <div>
                                <h4>Relations</h4>
                                <dl>
                                    <dt>Created by</dt>
                                    <dd><UserLink userId={command.creator_uid}>{command.creator_full_name}</UserLink></dd>
                                </dl>

                                <TimestampsSection entity={command} />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <CommandInstructions command={command} />
                    </TabPanel>
                    <TabPanel>
                        <CommandTerminal />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </article>
    </div >
}

export default CommandDetails;
