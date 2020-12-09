import React, {useEffect, useState} from 'react'
import secureApiFetch from '../../services/api';
import './Report.css';
import Breadcrumb from './../ui/Breadcrumb'
import {IconReport} from '../ui/Icons';
import Title from '../ui/Title';
import {Link, useRouteMatch} from "react-router-dom";
import Loading from "../ui/Loading";
import BtnPrimary from "../ui/buttons/BtnPrimary";
import useFetch from "../../hooks/useFetch";

const ProjectReport = () => {
    const {params: {id: projectId}} = useRouteMatch();
    const [project, setProject] = useState(null);
    const [preview, setPreview] = useState("");
    const [reports, updateReports] = useFetch(`/reports?projectId=${projectId}`);
    const [formValues, setFormValues] = useState({name: "", description: ""});
    const [saveVersionButtonDisabled, setSaveVersionButtonDisabled] = useState(true);

    useEffect(() => {
        secureApiFetch(`/projects/${projectId}`, {
            method: 'GET',
        })
            .then(resp => resp.json())
            .then(json => {
                setProject(json);
                document.title = `Report ${json.name} | Reconmap`;
            });
    }, [projectId, setProject]);

    useEffect(() => {
        secureApiFetch(`/reports/preview?projectId=${projectId}`, {
            method: 'GET',
        })
            .then(resp => resp.text())
            .then(text => {
                setPreview(text);
            });
    }, [projectId, reports]);

    const onSaveVersionSubmit = ev => {
        ev.preventDefault();

        const params = {
            projectId: projectId,
            name: formValues.name,
            description: formValues.description
        };
        secureApiFetch(`/reports`, {
            method: 'POST',
            body: JSON.stringify(params)
        })
            .then(resp => {
                updateReports();
            })
            .catch(err => console.error(err));
    };

    const onFormValueChange = ev => {
        ev.preventDefault();

        setFormValues({...formValues, [ev.target.name]: ev.target.value});
    };

    useEffect(() => {
        setSaveVersionButtonDisabled(formValues.name.length === 0);
    }, [formValues.name]);

    if (!project || !reports) {
        return <Loading/>
    }

    return (
        <>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                    <Link to={`/projects/${projectId}`}>{project.name}</Link>
                </Breadcrumb>
            </div>
            <Title type="Project reporting" title="Preview report"
                   icon={<IconReport/>}/>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <form onSubmit={onSaveVersionSubmit}>
                        <fieldset>
                            <legend>Report version</legend>

                            <label>Name</label>
                            <input type="text" name="name" value={formValues.name} onChange={onFormValueChange}
                                   placeholder="eg 1.0, 202103" required/>
                            <label>Description</label>
                            <input type="text" name="description" value={formValues.description}
                                   onChange={onFormValueChange}
                                   placeholder="eg Initial version, Draft"
                                   required/>
                        </fieldset>
                        <BtnPrimary type="submit" disabled={saveVersionButtonDisabled}>Save version</BtnPrimary>
                    </form>

                    <table>
                        <caption>Report versions</caption>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                        {reports.map((report, index) =>
                            <tr key={index}>
                                <td>{report.version_name}</td>
                                <td>{report.version_description}</td>
                            </tr>
                        )}
                        </thead>
                    </table>
                </div>
                <div className='text-sm mx-auto max-w-xl rounded overflow-auto shadow my-4'
                     id="report" dangerouslySetInnerHTML={{__html: preview}}></div>
            </div>
        </>
    )
}

export default ProjectReport;
