import React, { Component } from 'react'
import secureApiFetch from '../../services/api';
import MD5 from '../../services/md5';

class UserProfile extends Component {

    state = {
        user: null,
        auditLog: []
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        secureApiFetch(`/users/${id}`, {
            method: 'GET'
        })
            .then((responses) => responses.json())
            .then((data) => {
                this.setState({ user: data })
                document.title = `User ${data.name} | Reconmap`;
            });
            secureApiFetch(`/users/${id}/activity`, {
                method: 'GET'
            })
                .then((responses) => responses.json())
                .then((data) => {
                    this.setState({ auditLog: data })
                });            
    }

    render() {
        if(this.state.user === null) return <p>Loading...</p>
        const hash = MD5(this.state.user.email);
        return (
            <div>
                <div className=' flex flex-col md:flex-row items-center justify-center  max-w-xl mx-auto my-10'>

                    <figure className='w-48 h-48 bg-gray-800  rounded-full mr-10'><img src={`https://www.gravatar.com/avatar/${hash}?s=200&d=robohash`} /></figure>
                    <div className=' flex flex-col flex-1'>
                        <h1>{this.state.user.name}</h1>
                        <article className='text-gray-600'>
                            User since {this.state.user.insert_ts}
                    </article>
                        <div className='flex flex-row gap-4 my-2 font-semibold text-sm'>
                            <span className='px-3 py-1 rounded-full bg-red-500 text-black'>11 errors</span>
                            <span className='px-3 py-1 rounded-full bg-green-500 text-black'>2 awards</span>
                            <span className='px-3 py-1 rounded-full bg-yellow-500 text-black'>3 bugs</span>
                        </div>
                    </div>
                </div>
                <h3 className='mt-4'>Activity</h3>

                <ul>
                    {
                        this.state.auditLog.map((log, index) => <li><date>{log.insert_ts}</date> {log.action}</li>)
                    }
                </ul>

            </div>
        )
    }
}

export default UserProfile
