import RestrictedComponent from "components/logic/RestrictedComponent";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import LinkButton from "components/ui/buttons/Link";
import LoadingTableRow from "components/ui/tables/LoadingTableRow";
import NoResultsTableRow from "components/ui/tables/NoResultsTableRow";
import ClientLink from "../clients/Link";
import ProjectBadge from "./ProjectBadge";

const ProjectsTable = ({
    projects,
    destroy = null,
    showClientColumn = true,
}) => {
    const numColumns = showClientColumn ? 7 : 6;

    return (
        <table className="rm-listing">
            <thead>
                <tr>
                    <th>Name</th>
                    {showClientColumn && <th>Client</th>}
                    <th className="only-desktop">Description</th>
                    <th>Category</th>
                    <th>Vulnerability Metrics</th>
                    <th>Status</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {null === projects && (
                    <LoadingTableRow numColumns={numColumns} />
                )}
                {null !== projects && 0 === projects.length && (
                    <NoResultsTableRow numColumns={numColumns} />
                )}
                {null !== projects &&
                    0 !== projects.length &&
                    projects.map((project) => (
                        <tr key={project.id}>
                            <td>
                                <ProjectBadge project={project} />
                            </td>
                            {showClientColumn && (
                                <td>
                                    {project.is_template ? (
                                        <span title="Not applicable">
                                            (n/a)
                                        </span>
                                    ) : (
                                        <ClientLink
                                            clientId={project.client_id}
                                        >
                                            {project.client_name}
                                        </ClientLink>
                                    )}
                                </td>
                            )}
                            <td className="only-desktop">
                                {project.description}
                            </td>
                            <td>
                                {project.category_id !== null
                                    ? project.category_name
                                    : "(undefined)"}
                            </td>
                            <td>
                                {project.vulnerability_metrics
                                    ? project.vulnerability_metrics
                                    : "(undefined)"}
                            </td>
                            <td>{project.archived ? "Archived" : "Active"}</td>
                            <td style={{ textAlign: "right" }}>
                                <RestrictedComponent
                                    roles={[
                                        "administrator",
                                        "superuser",
                                        "user",
                                    ]}
                                >
                                    <LinkButton
                                        href={`/projects/${project.id}/edit`}
                                    >
                                        Edit
                                    </LinkButton>
                                    {destroy && (
                                        <DeleteIconButton
                                            onClick={() => destroy(project.id)}
                                        />
                                    )}
                                </RestrictedComponent>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

export default ProjectsTable;
