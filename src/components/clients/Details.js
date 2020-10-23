import React, {Component} from 'react'
import secureApiFetch from '../../services/api'
import DeleteButton from '../ui/buttons/Delete';
import Title from '../ui/Title';
import Timestamps from "../ui/Timestamps";
import ExternalLink from "../ui/ExternalLink";

class ClientDetails extends Component {

    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }

    state = {
        client: null,
    }

    componentDidMount() {
        const id = this.props.match.params.clientId;
        secureApiFetch(`/clients/${id}`, {
            method: 'GET'
        })
            .then((responses) => responses.json())
            .then((data) => {
                this.setState({client: data})
                document.title = `${data.name} - Client | Reconmap`;
            });
    }

    handleDelete(client) {
        if (window.confirm('Are you sure you want to delete this client?')) {
            secureApiFetch(`/clients/${client.id}`, {
                method: 'DELETE'
            })
                .then(() => {
                    this.props.history.push('/clients')
                })
                .catch(e => console.log(e))

        }
    }

    render() {
        const client = this.state.client;
        if (!client) {
            return 'Loading...'
        }
        return (
            <div>
                <div className='heading'>
                    <div>
                        <Title type='client' title={client.name}/>
                        <Timestamps insertTs={client.insert_ts} updateTs={client.update_ts}/>
                    </div>
                    <DeleteButton  onClick={() => this.handleDelete(client)}/>
                </div>
                <article className=''>
                    <table className='w-full'>
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


        )
    }
}

export default ClientDetails
