import { useQueryActiveProjects } from "api/projects.js";
import ProjectBadge from "components/projects/ProjectBadge";
import Loading from "components/ui/Loading";
import DashboardWidget from "./Widget";

const ActiveProjectsWidget = () => {
    const { data: projects, isPending } = useQueryActiveProjects();

    if (isPending) return <Loading />;

    return (
        <DashboardWidget title="Active projects">
            {projects.length === 0 ? (
                <p>No projects to show.</p>
            ) : (
                <table className="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Client</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id}>
                                <td>
                                    <ProjectBadge key={project.id} project={project} />
                                </td>
                                <td>{project.client_name ?? "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </DashboardWidget>
    );
};

export default ActiveProjectsWidget;
