import React, {Component} from 'react'
import secureApiFetch from '../../services/api';
import {IconUpload} from '../ui/Icons';
import Breadcrumb from '../ui/Breadcrumb'
import PrimaryButton from '../ui/buttons/Primary';
import Title from '../ui/Title';

class UploadTaskResult extends Component {

    constructor(props) {
        super(props)
        this.handleUploadClick = this.handleUploadClick.bind(this)
    }

    componentDidMount() {
        document.title = 'Upload Task | Reconmap';
    }

    handleUploadClick(ev) {
        ev.preventDefault();
        const taskId = this.props.match.params.id;

        const resultFileInput = document.getElementById('resultFile');
        const formData = new FormData();
        formData.append('resultFile', resultFileInput.files[0]);
        formData.append('taskId', taskId);
        secureApiFetch('/tasks/results', {
            method: 'POST',
            body: formData
        })
            .then(resp => {
                this.props.history.push('/tasks/' + taskId);
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div>
                <div className='heading'>
                    <Breadcrumb/>
                </div>
                <article>
                    <Title title='Upload Task Results'/>
                    <div className='items-start space-x-2'>
                        <div className='card flex-1'>
                            <h2>Results</h2>
                            <form>
                                <input type="file" id="resultFile"/>
                                <PrimaryButton onClick={this.handleUploadClick}><IconUpload/> Upload
                                    results</PrimaryButton>
                            </form>
                        </div>
                    </div>
                </article>
            </div>
        )
    }
}

export default UploadTaskResult
