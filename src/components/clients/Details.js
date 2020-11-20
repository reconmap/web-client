import React, {useEffect} from 'react'
import DeleteButton from '../ui/buttons/Delete';
import Title from '../ui/Title';
import Timestamps from "../ui/Timestamps";
import ExternalLink from "../ui/ExternalLink";
import {IconBriefcase} from '../ui/Icons';
import { useHistory, useRouteMatch } from 'react-router-dom';
import useFetch from './../../hooks/useFetch'
import useDelete from './../../hooks/useDelete'
import Loading from './../ui/Loading'

const ClientDetails = () => {
    const { params: { clientId } }= useRouteMatch()
    const history = useHistory()

    const [client] = useFetch(`/clients/${clientId}`)
    const destroy = useDelete(`/clients/${clientId}`)

    useEffect(()=>{
        if(client) document.title = `${client.name} - Client | Reconmap`;
    },[client])

    const handleDelete = () => {
        destroy
            .then(() => {history.push('/clients')} )
    }

    if (!client) {
        return <Loading />
    }
    return <div>
            <div className='heading'>
                <div>
                    <Title type='Client' title={client.name} icon={<IconBriefcase/>}/>
                    <Timestamps insertTs={client.insert_ts} updateTs={client.update_ts}/>
                </div>
                <DeleteButton onClick={handleDelete}/>
            </div>
            <article className=''>
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{client.name}</td>
                    </tr>
                    <tr>
                        <th>URL</th>
                        <td><ExternalLink href={client.url}>{client.url}</ExternalLink></td>
                    </tr>
                    <tr>
                        <th>Contact name</th>
                        <td>{client.contact_name}</td>
                    </tr>
                    <tr>
                        <th>Contact email</th>
                        <td>{client.contact_email}</td>
                    </tr>
                    <tr>
                        <th>Contact phone</th>
                        <td>{client.contact_phone}</td>
                    </tr>
                    </tbody>
                </table>
            </article>
        </div>
}

export default ClientDetails
