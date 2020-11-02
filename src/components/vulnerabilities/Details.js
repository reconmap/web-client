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
import {IconCheck, IconFlag} from '../icons';

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
        if (window.confirm('Are you sure you want to delete this vulnerability?')) {
            secureApiFetch(`/vulnerabilities/${vuln.id}`, {
                method: 'DELETE'
            })
                .then(() => {
                    this.props.history.push('/vulnerabilities')
                })
                .catch(e => console.error(e))

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
        const vulnerability = this.state.vulnerability;
        return (
            <div>
                <div className='heading'>
                    <Breadcrumb history={this.props.history}/>
                    {vulnerability &&
                    <ButtonGroup>
                        {vulnerability.status === 'open' &&
                        <BtnPrimary onClick={() => this.handleStatus(vulnerability)}>
                            <IconCheck/> Mark as closed</BtnPrimary>}
                        {vulnerability.status !== 'open' &&
                        <BtnPrimary onClick={() => this.handleStatus(vulnerability)}>Mark as open</BtnPrimary>}
                        <DeleteButton onClick={() => this.handleDelete(vulnerability)}/>
                    </ButtonGroup>
                    }
                </div>
                {!vulnerability ? <Loading/> :
                    <article>
                        <Title type='Vulnerability' title={vulnerability.summary} icon={<IconFlag/>}/>
                        <Timestamps insertTs={vulnerability.insert_ts} updateTs={vulnerability.update_ts}/>
                        <p>{vulnerability.description}</p>
                        <table>
                            <tbody>
                            <tr>
                                <th>Category</th>
                                <td>{vulnerability.category_name || '-'}</td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td><VulnerabilityStatusBadge status={vulnerability.status}/></td>
                            </tr>
                            <tr>
                                <th>CVSS score</th>
                                <td><CvssScore score={vulnerability.cvss_score}/></td>
                            </tr>
                            <tr>
                                <th>CVSS vector</th>
                                <td><ExternalLink
                                    href={`https://www.first.org/cvss/calculator/3.0#${vulnerability.cvss_vector}`}>{vulnerability.cvss_vector}</ExternalLink>
                                </td>
                            </tr>
                            <tr>
                                <th>Risk</th>
                                <td><RiskBadge risk={vulnerability.risk}/></td>
                            </tr>
                            <tr>
                                <th>Project</th>
                                <td>{vulnerability.project_id}</td>
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