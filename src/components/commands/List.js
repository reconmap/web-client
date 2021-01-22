import useSetTitle from '../../hooks/useSetTitle';
import Loading from '../ui/Loading';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import DeleteButton from "../ui/buttons/Delete";
import Title from '../ui/Title';
import { IconFolder } from '../ui/Icons';
import NoResults from "../ui/NoResults";
import CreateButton from 'components/ui/buttons/Create';
import { Link, useHistory } from 'react-router-dom';

const CommandsListPage = () => {
    const history = useHistory();
    const [commands, updateCommands] = useFetch('/commands')
    const destroy = useDelete('/commands/', updateCommands);

    useSetTitle('Commands');

    const onAddCommandClick = ev => {
        ev.preventDefault();

        history.push('/commands/add');
    }

    return <div>
        <div className='heading'>
            <Breadcrumb />
            <CreateButton onClick={onAddCommandClick}>Add command</CreateButton>
        </div>
        <Title title='Commands' icon={<IconFolder />} />
        {!commands ? <Loading /> :
            <table>
                <thead>
                    <tr>
                        <th>Short name</th>
                        <th>Description</th>
                        <th>Docker image</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {commands.length === 0 ?
                        <tr>
                            <td colSpan="4"><NoResults /></td>
                        </tr> :
                        commands.map(command =>
                            <tr key={command.id}>
                                <td><Link to={`/commands/${command.id}`}>{command.short_name}</Link></td>
                                <td>{command.description}</td>
                                <td>{command.docker_image}</td>
                                <td style={{ display: 'flex' }}>
                                    <DeleteButton onClick={() => destroy(command.id)} />
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        }
    </div>
}


export default CommandsListPage;
