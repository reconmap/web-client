import { ButtonGroup, Center, HStack, useDisclosure } from "@chakra-ui/react";
import PaginationV2 from "components/layout/PaginationV2";
import RestrictedComponent from "components/logic/RestrictedComponent";
import TargetModalDialog from "components/target/ModalDialog";
import TargetBadge from "components/target/TargetBadge";
import Tags from "components/ui/Tags";
import CreateButton from "components/ui/buttons/Create";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import useQuery from "hooks/useQuery";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import secureApiFetch from "../../services/api";
import { IconServer } from "../ui/Icons";
import Loading from "../ui/Loading";
import NoResultsTableRow from "../ui/tables/NoResultsTableRow";

const ProjectTargets = ({ project }) => {
    const query = useQuery();
    const urlPageNumber =
        query.get("page") !== null ? parseInt(query.get("page")) : 1;
    const [pageNumber, setPageNumber] = useState(urlPageNumber);

    const [numberPages, setNumberPages] = useState(1);
    const [targets, setTargets] = useState([]);

    const {
        isOpen: isAddTargetDialogOpen,
        onOpen: openAddTargetDialog,
        onClose: closeAddTargetDialog,
    } = useDisclosure();

    const onDeleteButtonClick = (ev, targetId) => {
        ev.preventDefault();

        secureApiFetch(`/targets/${targetId}`, { method: "DELETE" }).then(
            () => {
                reloadTargets();
            },
        );
    };

    const onTargetFormSaved = () => {
        reloadTargets();
        closeAddTargetDialog();
    };

    const reloadTargets = useCallback(() => {
        setTargets([]);

        secureApiFetch(
            `/targets?projectId=${project.id}&page=${pageNumber - 1}`,
            { method: "GET" },
        )
            .then((resp) => {
                if (resp.headers.has("X-Page-Count")) {
                    setNumberPages(resp.headers.get("X-Page-Count"));
                }
                return resp.json();
            })
            .then((data) => {
                setTargets(data);
            });
    }, [pageNumber, project]);

    const onPageChange = (pageNumber) => {
        setPageNumber(pageNumber);
    };

    useEffect(() => {
        reloadTargets();
    }, [reloadTargets]);

    return (
        <section>
            <h4>
                <IconServer />
                Targets
                {!project.archived && (
                    <RestrictedComponent
                        roles={["administrator", "superuser", "user"]}
                    >
                        <ButtonGroup>
                            <TargetModalDialog
                                project={project}
                                isOpen={isAddTargetDialogOpen}
                                onSubmit={onTargetFormSaved}
                                onCancel={closeAddTargetDialog}
                            />
                            <CreateButton onClick={openAddTargetDialog}>
                                Add target...
                            </CreateButton>
                        </ButtonGroup>
                    </RestrictedComponent>
                )}
            </h4>
            {!targets ? (
                <Loading />
            ) : (
                <>
                    {numberPages > 1 && (
                        <Center>
                            <PaginationV2
                                page={pageNumber - 1}
                                total={numberPages}
                                onPageChange={onPageChange}
                            />
                        </Center>
                    )}
                    <table className="rm-listing">
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
                            {targets.length === 0 && (
                                <NoResultsTableRow numColumns={4} />
                            )}
                            {targets.map((target, index) => (
                                <tr key={index}>
                                    <td>
                                        {!target.parent_id && (
                                            <HStack>
                                                <Link
                                                    to={`/targets/${target.id}`}
                                                >
                                                    <TargetBadge
                                                        name={target.name}
                                                    />
                                                </Link>
                                            </HStack>
                                        )}
                                        {target.parent_id !== null && (
                                            <>{target.parent_name ?? "-"}</>
                                        )}
                                    </td>
                                    <td>
                                        {target.parent_id !== null ? (
                                            <>
                                                <Link
                                                    to={`/targets/${target.id}`}
                                                >
                                                    <TargetBadge
                                                        name={target.name}
                                                    />
                                                </Link>
                                            </>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td>
                                        {target.kind}{" "}
                                        <Tags values={target.tags} />
                                    </td>
                                    <td>
                                        {target.num_vulnerabilities > 0
                                            ? `Yes (${target.num_vulnerabilities} vulnerabilities found)`
                                            : "No"}
                                    </td>
                                    <td>
                                        <RestrictedComponent
                                            roles={[
                                                "administrator",
                                                "superuser",
                                                "user",
                                            ]}
                                        >
                                            <DeleteIconButton
                                                onClick={(ev) =>
                                                    onDeleteButtonClick(
                                                        ev,
                                                        target.id,
                                                    )
                                                }
                                            />
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
