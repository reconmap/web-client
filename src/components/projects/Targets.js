import { Button, ButtonGroup, Center, HStack, useDisclosure } from "@chakra-ui/react";
import Pagination from "components/layout/Pagination";
import RestrictedComponent from "components/logic/RestrictedComponent";
import TargetModalDialog from "components/target/ModalDialog";
import TargetBadge from "components/target/TargetBadge";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import LinkButton from "components/ui/buttons/Link";
import Tags from "components/ui/Tags";
import useQuery from "hooks/useQuery";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import secureApiFetch from "../../services/api";
import { IconPlus, IconServer } from '../ui/Icons';
import Loading from "../ui/Loading";
import NoResultsTableRow from "../ui/NoResultsTableRow";

const ProjectTargets = ({ project }) => {
    const query = useQuery();
    const urlPageNumber = query.get('page') !== null ? parseInt(query.get('page')) : 1;
    const [pageNumber, setPageNumber] = useState(urlPageNumber);

    const [numberPages, setNumberPages] = useState(1);
    const [targets, setTargets] = useState([]);

    const { isOpen: isAddTargetDialogOpen, onOpen: openAddTargetDialog, onClose: closeAddTargetDialog } = useDisclosure();

    const onDeleteButtonClick = (ev, targetId) => {
        ev.preventDefault();

        secureApiFetch(`/targets/${targetId}`, { method: 'DELETE' })
            .then(() => {
                reloadTargets();
            })
    }

    const onTargetFormSaved = () => {
        reloadTargets();
        closeAddTargetDialog();
    }

    const reloadTargets = useCallback(() => {
        setTargets([]);

        secureApiFetch(`/targets?projectId=${project.id}&page=${pageNumber - 1}`, { method: 'GET' })
            .then(resp => {
                if (resp.headers.has('X-Page-Count')) {
                    setNumberPages(resp.headers.get('X-Page-Count'))
                }
                return resp.json()
            })
            .then(data => {
                setTargets(data);
            });
    }, [pageNumber, project]);

    const onPrevPageClick = () => {
        setPageNumber(pageNumber - 1);
    }
    const onNextPageClick = () => {
        setPageNumber(pageNumber + 1);
    }

    useEffect(() => {
        reloadTargets()
    }, [reloadTargets])

    return <section>
        <h4>
            <IconServer />Targets
            <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                <ButtonGroup>
                    <TargetModalDialog project={project} isOpen={isAddTargetDialogOpen} onSubmit={onTargetFormSaved} onCancel={closeAddTargetDialog} />
                    <Button onClick={openAddTargetDialog}><IconPlus />Add target</Button>
                    <LinkButton href={`/projects/${project.id}/targets/add-multiple`}><IconPlus />Add targets</LinkButton>
                </ButtonGroup>
            </RestrictedComponent>
        </h4>
        {!targets ? <Loading /> :
            <>
                {numberPages > 1 && <Center>
                    <Pagination page={pageNumber - 1} total={numberPages} handlePrev={onPrevPageClick} handleNext={onNextPageClick} />
                </Center>}
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Kind</th>
                            <th>Vulnerable?</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {targets.length === 0 && <NoResultsTableRow numColumns={4} />}
                        {targets.map((target, index) =>
                            <tr key={index}>
                                <td>
                                    <HStack>
                                        <Link to={`/targets/${target.id}`}><TargetBadge name={target.name} /></Link>
                                        <div><Tags values={target.tags} /></div>
                                    </HStack>
                                </td>
                                <td>{target.kind}</td>
                                <td>{target.num_vulnerabilities > 0 ? `Yes (${target.num_vulnerabilities} vulnerabilities found)` : "No"}</td>
                                <td>
                                    <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                                        <DeleteIconButton onClick={ev => onDeleteButtonClick(ev, target.id)} />
                                    </RestrictedComponent>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>
        }
    </section>
}

export default ProjectTargets;
