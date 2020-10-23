import React, {Component} from 'react'
import secureApiFetch from '../../services/api'
import CvssScore from '../badges/CvssScore';
import RiskBadge from '../badges/RiskBadge'
import BtnPrimary from '../ui/buttons/BtnPrimary';
import DeleteButton from '../ui/buttons/Delete';
import Title from '../ui/Title';
import ExternalLink from "../ui/ExternalLink";
import VulnerabilityStatusBadge from "./StatusBadge";
import ButtonGroup from "../ui/buttons/ButtonGroup";
import Breadcrumb from '../ui/Breadcrumb';
import Loading from '../ui/Loading';
import Timestamps from "../ui/Timestamps";

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
                this.setState({vulnerability: data})
                document.title = `Vulnerability ${data.summary} | Reconmap`;
            });
    }

    handleDelete(vuln) {
        if (window.confirm('Are you sure you want to delete this task?')) {
            secureApiFetch(`/vulnerabilities/${vuln.id}`, {
                method: 'DELETE'
            })
                .then(() => {
                    this.props.history.push('/vulnerabilities')
                })
                .catch(e => console.log(e))

        }
    }

    handleStatus(vuln) {
        secureApiFetch(`/vulnerabilities/${vuln.id}`, {
            method: 'PATCH',
            body: JSON.stringify({status: vuln.status === 'open' ? 'closed' : 'open'})
        })
            .then(() => {
                this.props.history.goBack()
            })
            .catch(e => console.log(e))
    }

    render() {
        const vuln = this.state.vulnerability;
        return (
            <div>
                <div className='heading'>
                    <Breadcrumb history={this.props.history}/>
                    {vuln &&
                    <ButtonGroup>
                        {vuln.status === 'open' &&
                        <BtnPrimary  onClick={() => this.handleStatus(vuln)}>Mark as
                            closed</BtnPrimary>}
                        {vuln.status !== 'open' &&
                        <BtnPrimary  onClick={() => this.handleStatus(vuln)}>Mark as open</BtnPrimary>}
                        <DeleteButton  onClick={() => this.handleDelete(vuln)}/>
                    </ButtonGroup>
                    }
                </div>
                {!vuln ? <Loading/> :
                    <article>
                        <Title type='Vulnerability' title={vuln.summary}/>
                        <Timestamps insertTs={vuln.insert_ts} updateTs={vuln.update_ts}/>
                        <p>{vuln.description}</p>
                        <table className='w-full'>
                            <tbody>
                            <tr>
                                <th>Category</th>
                                <td>{vuln.category_name || '-'}</td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td><VulnerabilityStatusBadge status={vuln.status}/></td>
                            </tr>
                            <tr>
                                <th>CVSS score</th>
                                <td><CvssScore score={vuln.cvss_score}/></td>
                            </tr>
                            <tr>
                                <th>CVSS vector</th>
                                <td><ExternalLink
                                    href={`https://www.first.org/cvss/calculator/3.0#${vuln.cvss_vector}`}>{vuln.cvss_vector}</ExternalLink>
                                </td>
                            </tr>
                            <tr>
                                <th>Risk</th>
                                <td><RiskBadge risk={vuln.risk}/></td>
                            </tr>
                            <tr>
                                <th>Project</th>
                                <td>{vuln.project_id}</td>
                            </tr>
                            </tbody>
                        </table>
                    </article>
                }
            </div>
        )
    }
}

export default VulnerabilityDetails