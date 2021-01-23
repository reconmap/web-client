import React, { useEffect } from 'react'
import DeleteButton from '../ui/buttons/Delete';
import Title from '../ui/Title';
import Timestamps from "../ui/Timestamps";
import ExternalLink from "../ui/ExternalLink";
import { IconBriefcase } from '../ui/Icons';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import useFetch from './../../hooks/useFetch'
import useDelete from './../../hooks/useDelete'
import Loading from './../ui/Loading'
import Breadcrumb from "../ui/Breadcrumb";
import EditButton from "../ui/buttons/Edit";
import ButtonGroup from "../ui/buttons/ButtonGroup";
import UserLink from 'components/users/Link';

const ClientDetails = () => {
    const { params: { clientId } } = useRouteMatch()
    const history = useHistory()

    const [client] = useFetch(`/clients/${clientId}`)
    const deleteClient = useDelete(`/clients/`)

    useEffect(() => {
        if (client) document.title = `${client.name} - Client | Reconmap`;
    }, [client])

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
                <EditButton onClick={(ev) => {
                    ev.preventDefault();
                    history.push(`/clients/${client.id}/edit`)
                }}>Edit</EditButton>
                <DeleteButton onClick={handleDelete} />
            </ButtonGroup>
        </div>
        <article>
            <div>
                <Title type='Client' title={client.name} icon={<IconBriefcase />} />
            </div>
            <Timestamps insertTs={client.insert_ts} updateTs={client.update_ts} />
            <div className="grid md:grid-cols-3">
                <div className="col-span-2">
                    <h4>Details</h4>
                    <dl>
                        <dt>Name</dt>
                        <dd>{client.name}</dd>

                        <dt>URL</dt>
                        <dd><ExternalLink href={client.url}>{client.url}</ExternalLink></dd>

                        <dt>Contact name</dt>
                        <dd>{client.contact_name}</dd>

                        <dt>Contact email</dt>
                        <dd><a href={`mailto:${client.contact_email}`}>{client.contact_email}</a></dd>

                        <dt>Contact phone</dt>
                        <dd><a href={`tel:${client.contact_phone}`}>{client.contact_phone}</a></dd>
                    </dl>
                </div>
                <div>
                    <h4>People</h4>
                    <dl>
                        <dt>Created by</dt>
                        <dd><UserLink userId={client.creator_uid}>{client.creator_full_name}</UserLink></dd>
                    </dl>
                </div>
            </div>
        </article>
    </div>
}

export default ClientDetails;
