import React, { Component } from 'react'
import secureApiFetch from '../../services/api'
import RiskBadge from '../badges/RiskBadge'

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

    handleDelete(id) {
        if (window.confirm('Are you sure you want to delete this task?')) {
            secureApiFetch(`/vulnerabilities/${id}`, {
                method: 'DELETE'
            })
                .then(() => { this.props.history.goBack() })
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
        if (!this.state.vulnerability) {
            return 'Loading...'
        }
        return (
            <div>
                <h3 className='heading'>Vulnerability {this.state.vulnerability.name}</h3>
                <div className='flex items-start gap-4'>
                    <article className='card w-48'>
                        <p>{this.state.vulnerability.description}</p>
                        <RiskBadge risk={vuln.risk} />
                        <dl>
                            <dt>Status</dt>
                            <dd>{vuln.status}</dd>
                        </dl>
                        <h2>Actions</h2>

                        {vuln.status === 'open' && <button onClick={() => this.handleStatus(vuln)}>Mark as closed</button>}
                        {vuln.status !== 'open' && <button onClick={() => this.handleStatus(vuln)}>Mark as open</button>}
                        <footer>
                            <label>Creation time</label>
                            <strong>{this.state.vulnerability.insert_ts}</strong>
                        </footer>
                    </article>
                </div>
            </div>
        )
    }
}

export default VulnerabilityDetails