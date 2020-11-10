import React, {Component} from 'react'
import secureApiFetch from '../../services/api'
import Badge from '../badges/Badge';
import DeleteButton from '../ui/buttons/Delete';
import Title from '../ui/Title';
import Timestamps from "../ui/Timestamps";

class TargetView extends Component {

    state = {
        target: null,
    }

    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        const id = this.props.match.params.targetId;
        secureApiFetch(`/targets/${id}`, {
            method: 'GET'
        })
            .then((responses) => responses.json())
            .then((data) => {
                this.setState({target: data})
                document.title = `Target ${data.summary} | Reconmap`;
            });
    }

    handleDelete(target) {
        if (window.confirm('Are you sure you want to delete this target?')) {
            secureApiFetch(`/targets/${target.id}`, {
                method: 'DELETE'
            })
                .then(() => {
                    this.props.history.push('/vulnerabilities')
                })
                .catch(e => console.log(e))

        }
    }

    render() {
        const target = this.state.target;
        if (!target) {
            return 'Loading...'
        }
        return (
            <div>
                <div className='heading'>
                    <div><Title type='Target' title={target.name}/>
                        <Timestamps insertTs={target.insert_ts} updateTs={target.update_ts}/>
                    </div>
                    <DeleteButton onClick={() => this.handleDelete(target)}/>
                </div>
                <article className=''>
                    <table>
                        <tbody>
                        <tr>
                            <th>Kind</th>
                            <td><Badge color={target.kind === 'hostname' ? 'green' : 'blue'}>{target.kind}</Badge></td>
                        </tr>
                        <tr>
                            <th>Project</th>
                            <td>{target.project_id}</td>
                        </tr>
                        </tbody>
                    </table>
                </article>
            </div>
        )
    }
}

export default TargetView
