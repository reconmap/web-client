import TimestampsSection from 'components/ui/TimestampsSection';
import UserLink from 'components/users/Link';
import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from "../ui/Breadcrumb";
import ButtonGroup from "../ui/buttons/ButtonGroup";
import DeleteButton from '../ui/buttons/Delete';
import EditButton from "../ui/buttons/Edit";
import { IconBriefcase } from '../ui/Icons';
import Loading from '../ui/Loading';
import Title from '../ui/Title';

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
                <EditButton onClick={(ev) => {
                    ev.preventDefault();
                    history.push(`/commands/${command.id}/edit`)
                }}>Edit</EditButton>
                <DeleteButton onClick={handleDelete} />
            </ButtonGroup>
        </div>
        <article>
            <div>
                <Title type='Command' title={command.name} icon={<IconBriefcase />} />
            </div>

            <div className="flex">
                <div className="half">
                    <h4>Details</h4>
                    <dl>
                        <dt>Short name</dt>
                        <dd>{command.short_name}</dd>

                        <dt>Description</dt>
                        <dd><ReactMarkdown>{command.description}</ReactMarkdown></dd>

                        <dt>Docker image</dt>
                        <dd>{command.docker_image}</dd>

                        <dt>Container args</dt>
                        <dd>
                            <code>{command.container_args}</code>
                        </dd>
                    </dl>
                </div>

                <div className="push-right">
                    <h4>Relations</h4>
                    <dl>
                        <dt>Created by</dt>
                        <dd><UserLink userId={command.creator_uid}>{command.creator_full_name}</UserLink></dd>
                    </dl>

                    <TimestampsSection entity={command} />
                </div>
            </div>
        </article>
    </div>
}

export default CommandDetails;
