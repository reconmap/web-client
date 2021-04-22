import RestrictedComponent from 'components/logic/RestrictedComponent';
import TimestampsSection from 'components/ui/TimestampsSection';
import UserLink from 'components/users/Link';
import React, { useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import Breadcrumb from "../ui/Breadcrumb";
import ButtonGroup from "../ui/buttons/ButtonGroup";
import DeleteButton from '../ui/buttons/Delete';
import EditButton from "../ui/buttons/Edit";
import ExternalLink from "../ui/ExternalLink";
import { IconBriefcase } from '../ui/Icons';
import Title from '../ui/Title';
import useDelete from './../../hooks/useDelete';
import useFetch from './../../hooks/useFetch';
import Loading from './../ui/Loading';

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
                <Title type='Client' title={client.name} icon={<IconBriefcase />} />
            </div>

            <div className="grid grid-two">
                <div>
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
                    <h4>Relations</h4>
                    <dl>
                        <dt>Created by</dt>
                        <dd><UserLink userId={client.creator_uid}>{client.creator_full_name}</UserLink></dd>
                    </dl>

                    <TimestampsSection entity={client} />
                </div>
            </div>
        </article>
    </div>
}

export default ClientDetails;
