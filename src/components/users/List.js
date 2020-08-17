import React, { Component } from 'react'
import configuration from '../../Configuration';

class UsersList extends Component {
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

    render() {
        return (
            <>
                <h1>Users</h1>
                <button href="#">Create user</button>

                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.role}</td>
                                        <td><a href="delete.html">Delete</a></td>
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