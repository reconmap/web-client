import React, { Component } from 'react'
import configuration from '../../Configuration';

class UsersList extends Component {
    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }
    state = {
        users: []
    }

    componentDidMount() {
        fetch(`${configuration.api.baseUrl}/users`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then((response) => response.json())
            .then((users) => this.setState({ users: users }));
    }

    handleDelete(id) {
        if (window.confirm('Are you sure you want to delete this user?')) {
            fetch(`${configuration.api.baseUrl}/users/${id}`, {
                method: 'DELETE',
                headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') }
            })
                .then(() => { this.props.history.goBack() })
                .catch(e => console.log(e))

        }
    }

    render() {
        return (
            <>
                <div className='heading'>
                    <h1>Users</h1>
                    <button onClick={() => { this.props.history.push("/dashboard/users/create"); }}>Create user</button>
                </div>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.role}</td>
                                        <td className='text-right'><button onClick={() => this.handleDelete(user.id)} type='delete'>Delete</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </>
        )
    }
}

export default UsersList