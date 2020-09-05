import React, { Component } from 'react'
import secureApiFetch from '../../services/api'
import DeleteButton from '../ui/buttons/Delete';

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
                    <div>
                        <h2>Target</h2>
                        <h1>{target.name}</h1>
                        <p>Kind: {target.kind}</p>
                    </div>
                    <div>
                        <DeleteButton onClick={() => this.handleDelete(target)} />
                    </div>
                </div>
            </div>
        )
    }
}

export default TargetView