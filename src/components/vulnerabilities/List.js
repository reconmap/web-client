import React, { Component } from 'react'
import secureApiFetch from '../../services/api'
import { Link } from 'react-router-dom';
import DeleteButton from '../ui/buttons/Delete';

class VulnerabilitiesList extends Component {
    state = {
        vulnerabilities: []
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        secureApiFetch(`/vulnerabilities`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => this.setState({ vulnerabilities: data }));
    }

    handleDelete(id) {
        if (window.confirm('Are you sure you want to delete this vulnerability?')) {
            secureApiFetch(`/vulnerabilities/${id}`, {
                method: 'DELETE'
            })
                .then(() => this.loadData())
                .catch(e => console.log(e))

        }
    }

    render() {
        return (
            <>
                <div className='heading'>
                    <h1>Vulnerabilities</h1>
                    <button ><i data-feather='plus' className='mr-2' /> Create Vulnerability</button>
                </div>

                <table className='w-full my-4'>
                    <thead>
                        <tr>
                            <th>Date/Time</th>
                            <th>Summary</th>
                            <th>Description</th>
                            <th>Risk</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.vulnerabilities.length == 0 &&
                            <tr>
                                <td colspan="6" style={{textAlign: "center"}}>
                                    <img src="/images/blank-canvas.png" alt="No results" style={{width: '240px', margin: "auto"}} />
                                    <h3>No results</h3>
                                </td>
                            </tr>
                        }
                        {
                            this.state.vulnerabilities.map((vulnerability, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{vulnerability.insert_ts}</td>
                                        <td><Link to={`/vulnerabilities/${vulnerability.id}`}>{vulnerability.summary}</Link></td>
                                        <td><Link to={`/vulnerabilities/${vulnerability.id}`}>{vulnerability.description}</Link></td>
                                        <td>{vulnerability.risk}</td>
                                        <td>OPEN</td>
                                        <td><DeleteButton onClick={() => this.handleDelete(vulnerability.id)} /></td>
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

export default VulnerabilitiesList