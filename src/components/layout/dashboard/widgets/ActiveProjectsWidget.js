import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";
import { Link } from "react-router-dom";

const ActiveProjectsWidget = () => {
    const [projects] = useFetch(`/projects?status=active&limit=5`)

    if (!projects) return <Loading />

    return <article className="card">
        <h4>Active projects</h4>

        {projects.length === 0 ?
            <p>No projects to show.</p>
            :
            <table>
                <thead>
                    <th>Name</th>
                </thead>
                <tbody>
                    {projects.map(project => <tr>
                        <td><Link to={`/projects/${project.id}`}>{project.name}</Link></td>
                    </tr>)}
                </tbody>
            </table>
        }
    </article>
}

export default ActiveProjectsWidget;
