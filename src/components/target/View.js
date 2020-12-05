import React, {useEffect} from 'react'
import Badge from '../badges/Badge';
import DeleteButton from '../ui/buttons/Delete';
import Title from '../ui/Title';
import Timestamps from "../ui/Timestamps";
import Loading from '../ui/Loading';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';

const TargetView = ({match, history}) => {
    const id = match.params.targetId;
    const [target] = useFetch(`/targets/${id}`)
    const destroy = useDelete(`/targets/${id}`);

    useEffect(() => {
        if (target) document.title = `Target ${target.summary} | Reconmap`;
    }, [target])

    const handleDelete = () => {
        destroy()
            .then(() => {
                history.push('/projects');
            })
            .catch((err) => console.error(err))
    }

    if (!target) return <Loading/>
    return <div>
        <div className='heading'>
            <div><Title type='Target' title={target.name}/>
                <Timestamps insertTs={target.insert_ts} updateTs={target.update_ts}/>
            </div>
            <DeleteButton onClick={handleDelete}/>
        </div>
        <article>
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
}

export default TargetView
