import { useAssetsQuery, useDeleteAssetMutation } from "api/assets.js";
import PaginationV2 from "components/layout/PaginationV2";
import RestrictedComponent from "components/logic/RestrictedComponent";
import TargetModalDialog from "components/target/ModalDialog";
import TargetBadge from "components/target/TargetBadge";
import Tags from "components/ui/Tags";
import CreateButton from "components/ui/buttons/Create";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import useBoolean from "hooks/useBoolean";
import useQuery from "hooks/useQuery";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../ui/Loading";
import NoResultsTableRow from "../ui/tables/NoResultsTableRow";

const ProjectTargets = ({ project }) => {
    const query = useQuery();
    const urlPageNumber = query.get("page") !== null ? parseInt(query.get("page")) : 1;
    const [pageNumber, setPageNumber] = useState(urlPageNumber);

    const { value: isAddTargetDialogOpen, setTrue: openAddTargetDialog, setFalse: closeAddTargetDialog } = useBoolean();
    const {
        data: targets,
        isLoading,
        refetch,
    } = useAssetsQuery({ limit: 5, projectId: project.id, page: pageNumber - 1 });
    const deleteAssetMutation = useDeleteAssetMutation();

    const onDeleteButtonClick = (ev, targetId) => {
        ev.preventDefault();

        deleteAssetMutation.mutate(targetId);
        refetch();
    };

    const onTargetFormSaved = () => {
        refetch();
        closeAddTargetDialog();
    };

    const onPageChange = (pageNumber) => {
        setPageNumber(pageNumber + 1);
    };

    return (
        <section>
            <h4 className="title is=4">Assets</h4>
            {!project.archived && (
                <RestrictedComponent roles={["administrator", "superuser", "user"]}>
                    <TargetModalDialog
                        project={project}
                        isOpen={isAddTargetDialogOpen}
                        onSubmit={onTargetFormSaved}
                        onCancel={closeAddTargetDialog}
                    />
                    <CreateButton onClick={openAddTargetDialog}>Add asset&hellip;</CreateButton>
                </RestrictedComponent>
            )}
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {targets.pageCount > 1 && (
                        <center>
                            <PaginationV2 page={pageNumber - 1} total={targets.pageCount} onPageChange={onPageChange} />
                        </center>
                    )}
                    <table className="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Sub-target</th>
                                <th>Kind</th>
                                <th>Vulnerable?</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {targets.data.length === 0 && <NoResultsTableRow numColumns={4} />}
                            {targets.data.map((target, index) => (
                                <tr key={index}>
                                    <td>
                                        {!target.parent_id && (
                                            <div>
                                                <Link to={`/targets/${target.id}`}>
                                                    <TargetBadge name={target.name} />
                                                </Link>
                                            </div>
                                        )}
                                        {target.parent_id !== null && <>{target.parent_name ?? "-"}</>}
                                    </td>
                                    <td>
                                        {target.parent_id !== null ? (
                                            <>
                                                <Link to={`/targets/${target.id}`}>
                                                    <TargetBadge name={target.name} />
                                                </Link>
                                            </>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td>
                                        {target.kind} <Tags values={target.tags} />
                                    </td>
                                    <td>
                                        {target.num_vulnerabilities > 0
                                            ? `Yes (${target.num_vulnerabilities} vulnerabilities found)`
                                            : "No"}
                                    </td>
                                    <td>
                                        <RestrictedComponent roles={["administrator", "superuser", "user"]}>
                                            <DeleteIconButton onClick={(ev) => onDeleteButtonClick(ev, target.id)} />
                                        </RestrictedComponent>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </section>
    );
};

export default ProjectTargets;
