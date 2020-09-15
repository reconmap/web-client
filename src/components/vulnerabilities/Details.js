import React, { Component } from 'react'
import secureApiFetch from '../../services/api'
import RiskBadge from '../badges/RiskBadge'
import BtnSecondary from '../ui/buttons/BtnSecondary';
import DeleteButton from '../ui/buttons/Delete';

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
                    <div>
                        <h2>Vulnerability</h2>
                        <h1>{vuln.summary}</h1>
                        <RiskBadge risk={vuln.risk} />
                    </div>
                    <div>
                        {vuln.status === 'open' && <BtnSecondary size='sm' onClick={() => this.handleStatus(vuln)}>Mark as closed</BtnSecondary>}
                        {vuln.status !== 'open' && <BtnSecondary size='sm' onClick={() => this.handleStatus(vuln)}>Mark as open</BtnSecondary>}

                        <DeleteButton onClick={() => this.handleDelete(vuln)} />
                    </div>
                </div>
                <div>
                    <article className=''>
                        <p>{vuln.description}</p>
                        <dl>
                            <dt>Status</dt>
                            <dd>{vuln.status}</dd>
                            <dt>Creation time</dt>
                            <dd>{vuln.insert_ts}</dd>
                        </dl>
                    </article>
                </div>
            </div>
        )
    }
}

export default VulnerabilityDetails