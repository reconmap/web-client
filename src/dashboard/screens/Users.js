import React from 'react'

const Users = () => {
    return (
        <>

<a href="#">Create user</a>

<table>
    <tr>
        <th>Username</th>
        <th>Role</th>
        <th>Options</th>
    </tr>
    <tr>
        <td>root</td>
        <td>admin</td>
        <td><a href="#">Delete</a></td>
    </tr>
    <tr>
        <td>user</td>
        <td>read-only</td>
        <td><a href="#">Delete</a></td>
    </tr>
</table>
        </>
    )
}

export default Users