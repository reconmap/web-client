import RestrictedComponent from 'components/logic/RestrictedComponent';
import ShellCommand from 'components/ui/ShellCommand';
import Tab from 'components/ui/Tab';
import Tabs from 'components/ui/Tabs';
import TimestampsSection from 'components/ui/TimestampsSection';
import UserLink from 'components/users/Link';
import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import CommandService from 'services/command';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from "../ui/Breadcrumb";
import ButtonGroup from "../ui/buttons/ButtonGroup";
import DeleteButton from '../ui/buttons/Delete';
import EditButton from "../ui/buttons/Edit";
import { IconBriefcase } from '../ui/Icons';
import Loading from '../ui/Loading';
import Title from '../ui/Title';
import CommandInstructions from './Instructions';

const CommandDetails = () => {
    const { params: { commandId } } = useRouteMatch()
    const history = useHistory()

    const [command] = useFetch(`/commands/${commandId}`)
    const deleteClient = useDelete(`/commands/`)

    useEffect(() => {
        if (command) document.title = `${command.short_name} - Command | Reconmap`;
    }, [command])

    const handleDelete = async () => {
        const confirmed = await deleteClient(commandId);
        if (confirmed)
            history.push('/commands');
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
                        history.push(`/commands/${command.id}/edit`)
                    }}>Edit</EditButton>
                    <DeleteButton onClick={handleDelete} />
                </RestrictedComponent>
            </ButtonGroup>
        </div>
        <article>
            <div>
                <Title type='Command' title={command.short_name} icon={<IconBriefcase />} />
            </div>

            <Tabs>
                <Tab name="Details">
                    <div className="grid grid-two">
                        <div>
                            <h4>Details</h4>
                            <dl>
                                <dt>Description</dt>
                                <dd><ReactMarkdown>{command.description}</ReactMarkdown></dd>

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
                </Tab>
                {(command.executable_path || command.docker_image) &&
                    <Tab name="Run instructions">
                        <CommandInstructions command={command} />
                    </Tab>
                }
            </Tabs>
        </article>
    </div>
}

export default CommandDetails;
