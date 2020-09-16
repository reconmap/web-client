import React, { Component } from 'react'
import secureApiFetch from '../../services/api'
import Badge from '../badges/Badge';
import DeleteButton from '../ui/buttons/Delete';
import Title from '../ui/Title';

class TargetView extends Component {

    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }

    state = {
        target: null,
    }

    componentDidMount() {
        const id = this.props.match.params.targetId;
        secureApiFetch(`/targets/${id}`, {
            method: 'GET'
        })
            .then((responses) => responses.json())
            .then((data) => {
                this.setState({ target: data })
                document.title = `Target ${data.summary} | Reconmap`;
            });
    }

    handleDelete(target) {
        if (window.confirm('Are you sure you want to delete this target?')) {
            secureApiFetch(`/targets/${target.id}`, {
                method: 'DELETE'
            })
                .then(() => { this.props.history.push('/vulnerabilities') })
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
                    <Title type='Target' title={target.name} />
                    <DeleteButton size='sm' onClick={() => this.handleDelete(target)} />
                </div>
                <article className=''>
                    <table className='w-full'>
                        <tbody>
                            <tr> <th>Kind</th> <td><Badge color={target.kind === 'hostname' ? 'green':'blue'}>{target.kind}</Badge></td> </tr>
                            <tr> <th>Creation time</th> <td>{target.insert_ts}</td> </tr>
                            <tr> <th>Update time</th> <td>{target.update_ts}</td> </tr>
                            <tr> <th>Project</th> <td>{target.project_id}</td> </tr>
                        </tbody>
                    </table>
                </article>
            </div>


        )
    }
}

export default TargetView