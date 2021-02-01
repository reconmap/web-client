import TimestampsSection from 'components/ui/TimestampsSection';
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Badge from "../badges/Badge";
import Breadcrumb from "../ui/Breadcrumb";
import DeleteButton from '../ui/buttons/Delete';
import Loading from '../ui/Loading';
import Title from '../ui/Title';
import VulnerabilitiesTable from "../vulnerabilities/VulnerabilitiesTable";

const TargetView = ({ match, history }) => {
    const { projectId, targetId } = match.params;
    const [target] = useFetch(`/targets/${targetId}`)
    const destroy = useDelete(`/targets/`);
    const [savedProject] = useFetch(`/projects/${projectId}`);
    const [vulnerabilities] = useFetch(`/vulnerabilities?targetId=${targetId}`);

    useEffect(() => {
        if (target) document.title = `Target ${target.name} | Reconmap`;
    }, [target])

    const handleDelete = () => {
        destroy(targetId)
            .then((success) => {
                if (success)
                    history.push('/projects');
            })
            .catch((err) => console.error(err))
    }

    if (!target || !vulnerabilities || !savedProject) return <Loading />

    return <div>
        <div className='heading'>
            <Breadcrumb>
                <Link to="/projects">Projects</Link>
                <Link to={`/projects/${savedProject.id}`}>{savedProject.name}</Link>
            </Breadcrumb>
            <DeleteButton onClick={handleDelete} />
        </div>
        <article>
            <div>
                <Title type='Target' title={target.name} />

                <div className="flex">
                    <div className="half">
                        <h4>Kind</h4>
                        <Badge color={target.kind === 'hostname' ? 'green' : 'blue'}>{target.kind}</Badge>
                    </div>

                    <div className="push-right">
                        <TimestampsSection entity={target} />
                    </div>
                </div>

                <h4>Vulnerabilities</h4>
                <VulnerabilitiesTable vulnerabilities={vulnerabilities} />
            </div>
        </article>
    </div>
}

export default TargetView;
