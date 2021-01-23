import React, { useEffect } from 'react'
import DeleteButton from '../ui/buttons/Delete';
import Title from '../ui/Title';
import Timestamps from "../ui/Timestamps";
import { IconBriefcase } from '../ui/Icons';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import useFetch from '../../hooks/useFetch'
import useDelete from '../../hooks/useDelete'
import Loading from '../ui/Loading'
import Breadcrumb from "../ui/Breadcrumb";
import EditButton from "../ui/buttons/Edit";
import ButtonGroup from "../ui/buttons/ButtonGroup";
import ReactMarkdown from 'react-markdown';

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
            <Timestamps insertTs={command.insert_ts} updateTs={command.update_ts} />
            <div className="two-columns">
                <div>
                    <h4>Details</h4>
                    <dl>
                        <dt>Short name</dt>
                        <dd>{command.short_name}</dd>

                        <dt>Description</dt>
                        <dd><ReactMarkdown>{command.description}</ReactMarkdown></dd>

                        <dt>Docker image</dt>
                        <dd>{command.docker_image}</dd>

                        <dt>Container args</dt>
                        <dd>{command.container_args}</dd>
                    </dl>
                </div>
                <div>
                    <h4>People</h4>
                    <dl>
                        <dt>Created by</dt>
                        <dd>{command.creator_full_name}</dd>
                    </dl>
                </div>
            </div>
        </article>
    </div>
}

export default CommandDetails;
