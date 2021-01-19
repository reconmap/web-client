import React, { useEffect, useState } from 'react'
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb'
import Title from '../ui/Title';
import { Link, useHistory, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loading from "../ui/Loading";
import PrimaryButton from "../ui/buttons/Primary";
import { IconUpload } from "../ui/Icons";

const UploadTaskResult = () => {

    const routeParams = useParams();
    const history = useHistory();

    const taskId = routeParams.taskId;

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
                history.push('/tasks/' + taskId);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        document.title = 'Upload Task | Reconmap';
    }, []);

    if (!task) return <Loading />

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/tasks">Tasks</Link>
                    {task && <Link to={`/tasks/${task.id}`}>{task.name}</Link>}
                </Breadcrumb>
            </div>
            <article>
                <Title title={`${task.name} results`} />
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
