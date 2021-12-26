import PageTitle from 'components/logic/PageTitle';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import PrimaryButton from "../ui/buttons/Primary";
import { IconUpload } from "../ui/Icons";
import Loading from "../ui/Loading";
import Title from '../ui/Title';

const UploadTaskResult = () => {
    const navigate = useNavigate();

    const { taskId } = useParams();

    const [task] = useFetch(`/tasks/${taskId}`);
    const [uploadButtonDisabled, setUploadButtonDisabled] = useState(true);

    const onFileSelect = ev => {
        ev.preventDefault();

        setUploadButtonDisabled(ev.target.files.length === 0);
    }

    const handleUploadClick = ev => {
        ev.preventDefault();

        const resultFileInput = document.getElementById('resultFile');
        const formData = new FormData();
        formData.append('resultFile', resultFileInput.files[0]);
        formData.append('taskId', taskId);
        secureApiFetch('/commands/outputs', {
            method: 'POST',
            body: formData
        })
            .then(resp => {
                navigate('/tasks/' + taskId);
            })
            .catch(err => console.error(err));
    }

    if (!task) return <Loading />

    return (
        <div>
            <PageTitle value="Upload Task" />
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/tasks">Tasks</Link>
                    {task && <Link to={`/tasks/${task.id}`}>{task.summary}</Link>}
                </Breadcrumb>
            </div>
            <article>
                <Title title={`${task.summary} results`} />
                <div className='items-start space-x-2'>
                    <div className='card flex-1'>
                        <h2>Upload {task.command_parser} output</h2>
                        <form>
                            <input type="file" id="resultFile" onChange={onFileSelect} />
                            <PrimaryButton disabled={uploadButtonDisabled}
                                onClick={handleUploadClick}><IconUpload /> Upload
                                results</PrimaryButton>
                        </form>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default UploadTaskResult;
