import React, { Component } from 'react'
import configuration from '../../Configuration';

class UsersList extends Component {
    constructor(props){
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
        if (window.confirm('Are you sure you want to delete this user?') ) {
            fetch(`${configuration.api.baseUrl}/users/${id}`, {
                method: 'DELETE',
                headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') }
            })
            .then(() =>{ this.props.history.goBack() })
            .catch(e => console.log(e))
            
        }
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
                                        <td><button onClick={()=>this.handleDelete(user.id)}>Delete</button></td>
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