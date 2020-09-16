import React, { Component } from 'react'
import secureApiFetch from '../../services/api'
import Badge from '../badges/Badge'
import CvssScore from '../badges/CvssScore';
import RiskBadge from '../badges/RiskBadge'
import BtnPrimary from '../ui/buttons/BtnPrimary';
import DeleteButton from '../ui/buttons/Delete';
import Title from '../ui/Title';

class VulnerabilityDetails extends Component {
    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }
    state = {
        vulnerability: null,
    }

    componentDidMount() {

        const id = this.props.match.params.id;
        secureApiFetch(`/vulnerabilities/${id}`, {
            method: 'GET'
        })
            .then((responses) => responses.json())
            .then((data) => {
                this.setState({ vulnerability: data })
                document.title = `Vulnerability ${data.summary} | Reconmap`;
            });
    }

    handleDelete(vuln) {
        if (window.confirm('Are you sure you want to delete this task?')) {
            secureApiFetch(`/vulnerabilities/${vuln.id}`, {
                method: 'DELETE'
            })
                .then(() => { this.props.history.push('/vulnerabilities') })
                .catch(e => console.log(e))

        }
    }

    handleStatus(vuln) {
        secureApiFetch(`/vulnerabilities/${vuln.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status: vuln.status === 'open' ? 'closed' : 'open' })
        })
            .then(() => { this.props.history.goBack() })
            .catch(e => console.log(e))
    }

    render() {
        const vuln = this.state.vulnerability;
        if (!vuln) {
            return 'Loading...'
        }
        return (
            <div>
                <div className='heading'>
                    <Title type='Vulnerability' title={vuln.summary} />
                    <DeleteButton size='sm' onClick={() => this.handleDelete(vuln)} />
                </div>
                <article className=''>
                    <p>{vuln.description}</p>
                    <table className='w-full'>
                        <tbody>
                            <tr> <th>Status</th> <td><Badge color={vuln.status === 'open' ? 'green':'blue'}>{vuln.status}</Badge></td> </tr>
                            <tr> <th>cvss_score</th> <td><CvssScore score={vuln.cvss_score} /></td> </tr>
                            <tr> <th>Risk</th> <td><RiskBadge risk={vuln.risk} /></td> </tr>
                            <tr> <th>Actions</th>
                                <td className='py-2'>
                                    {vuln.status === 'open' && <BtnPrimary size='sm' onClick={() => this.handleStatus(vuln)}>Mark as closed</BtnPrimary>}
                                    {vuln.status !== 'open' && <BtnPrimary size='sm' onClick={() => this.handleStatus(vuln)}>Mark as open</BtnPrimary>}
                                </td>
                            </tr>
                            <tr> <th>Creation time</th> <td>{vuln.insert_ts}</td> </tr>
                            <tr> <th>Update time</th> <td>{vuln.update_ts}</td> </tr>
                            <tr> <th>Project</th> <td>{vuln.project_id}</td> </tr>
                        </tbody>
                    </table>
                </article>
            </div>
        )
    }
}

export default VulnerabilityDetails