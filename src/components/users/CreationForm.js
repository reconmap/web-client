import React, { Component } from 'react'
import configuration from '../../Configuration';

class UserCreationForm extends Component {

    handleCreate() {
        fetch(`${configuration.api.baseUrl}/users`, {
            method: 'POST',
            body: JSON.stringify({
                name: 'new creator',
                password: 'creator',
                email: 'creator@foo.com',
                role: 'creator',
            }),
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then((response) => response.json())
            .then((users) => this.history.back());
    }

    render() {
        return (
            <>
            <form>
                Name
                <input type="text" name="name" />
                Password
                <input type="password" name="password" />
                Email
                <input type="text" name="email" />
                Role
                <select name="role">
                    <option>Creator</option>
                    <option>Writer</option>
                    <option>Reader</option>
                </select>
                <button onClick={this.handleCreate}>Create</button>
            </form>
            </>
        )
    }
}

export default UserCreationForm
