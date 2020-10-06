import React, {Component} from 'react'
import secureApiFetch from '../../services/api';
import {IconUpload} from '../icons';
import Breadcrumb from '../ui/Breadcrumb'
import BtnPrimary from '../ui/buttons/BtnPrimary';
import Title from '../ui/Title';

class UploadTaskResult extends Component {

    constructor(props) {
        super(props)
        this.handleUploadClick = this.handleUploadClick.bind(this)
    }

    componentDidMount() {
        document.title = 'Upload Task | Reconmap';
    }

    handleUploadClick(e) {
        e.preventDefault();
        const taskId = this.props.match.params.id;

        const resultFileInput = document.getElementById('resultFile');
        const formData = new FormData();
        formData.append('resultFile', resultFileInput.files[0]);
        formData.append('taskId', taskId);
        secureApiFetch('/tasks/results', {
            method: 'POST',
            body: formData
        })
            .then((response) => {
                this.props.history.push('/tasks/' + taskId);
            })
            .catch((error) => console.log(error));
    }

    handleGoBack() {
        this.props.history.goBack()
    }

    render() {
        return (
            <div>
                <div className='heading'>
                    <Breadcrumb history={this.props.history}/>
                </div>
                <article>
                    <Title title='Upload Task Results'/>
                    <div className='items-start gap-4'>
                        <div className='card flex-1'>
                            <h2>Results</h2>
                            <form>
                                <input type="file" id="resultFile"/>
                                <BtnPrimary onClick={this.handleUploadClick}><IconUpload styling='mr-2'/> Upload results</BtnPrimary>
                            </form>
                        </div>
                    </div>
                </article>
            </div>
        )
    }
}

export default UploadTaskResult