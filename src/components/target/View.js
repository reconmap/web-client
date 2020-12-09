import React, {useEffect} from 'react'
import Badge from '../badges/Badge';
import DeleteButton from '../ui/buttons/Delete';
import Title from '../ui/Title';
import Timestamps from "../ui/Timestamps";
import Loading from '../ui/Loading';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from "../ui/Breadcrumb";
import {Link} from "react-router-dom";

const TargetView = ({match, history}) => {
    const {projectId, targetId} = match.params;
    const [target] = useFetch(`/targets/${targetId}`)
    const destroy = useDelete(`/targets/`);
    const [savedProject] = useFetch(`/projects/${projectId}`);

    useEffect(() => {
        if (target) document.title = `Target ${target.summary} | Reconmap`;
    }, [target])

    const handleDelete = () => {
        destroy(targetId)
            .then((success) => {
                if (success)
                    history.push('/projects');
            })
            .catch((err) => console.error(err))
    }

    if (!target || !savedProject) return <Loading/>

    return <div>
        <div className='heading'>
            <Breadcrumb>
                <Link to="/projects">Projects</Link>
                <Link to={`/projects/${savedProject.id}`}>{savedProject.name}</Link>
            </Breadcrumb>
            <DeleteButton onClick={handleDelete}/>
        </div>
        <article>
            <div>
                <Title type='Target' title={target.name}/>
                <Timestamps insertTs={target.insert_ts} updateTs={target.update_ts}/>
            </div>
            <table>
                <tbody>
                <tr>
                    <td>Kind</td>
                    <td><Badge color={target.kind === 'hostname' ? 'green' : 'blue'}>{target.kind}</Badge></td>
                </tr>
                </tbody>
            </table>
        </article>
    </div>
}

export default TargetView
