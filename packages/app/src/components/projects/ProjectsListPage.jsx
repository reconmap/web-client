import NativeSelect from "components/form/NativeSelect";
import PaginationV2 from "components/layout/PaginationV2";
import RestrictedComponent from "components/logic/RestrictedComponent";
import Title from "components/ui/Title";
import useDocumentTitle from "hooks/useDocumentTitle";
import useQuery from "hooks/useQuery";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import secureApiFetch from "services/api";
import useDelete from "../../hooks/useDelete.js";
import Breadcrumb from "../ui/Breadcrumb.jsx";
import CreateButton from "../ui/buttons/Create.jsx";
import ProjectsTable from "./Table.jsx";

const ProjectsListPage = () => {
    const navigate = useNavigate();
    const query = useQuery();
    let pageNumber = query.get("page");
    pageNumber = pageNumber !== null ? parseInt(pageNumber) : 1;
    const apiPageNumber = pageNumber - 1;

    const [numberPages, setNumberPages] = useState(1);
    const [totalCount, setTotalCount] = useState("?");

    const [projects, setProjects] = useState([]);
    const [statusFilter, setStatusFilter] = useState("active");

    const handleCreateProject = () => {
        navigate("/projects/create");
    };

    const onStatusFilterChange = (ev) => {
        setStatusFilter(ev.target.value);
    };

    const onPageChange = (pageNumber) => {
        const queryParams = new URLSearchParams();
        queryParams.set("page", pageNumber + 1);
        const url = `/projects?${queryParams.toString()}`;
        navigate(url);
    };

    const reloadProjects = useCallback(() => {
        setProjects(null);

        const queryParams = new URLSearchParams();
        queryParams.set("page", apiPageNumber);
        if (statusFilter.length) {
            queryParams.set("status", statusFilter);
        }
        const url = `/projects?${queryParams.toString()}`;

        secureApiFetch(url)
            .then((resp) => {
                if (resp.headers.has("X-Page-Count")) {
                    setNumberPages(resp.headers.get("X-Page-Count"));
                }
                if (resp.headers.has("X-Total-Count")) {
                    setTotalCount(resp.headers.get("X-Total-Count"));
                }
                return resp.json();
            })
            .then((projects) => {
                setProjects(projects);
            });
    }, [apiPageNumber, statusFilter]);

    const destroy = useDelete("/projects/", reloadProjects);

    useDocumentTitle("Projects");

    useEffect(() => {
        reloadProjects();
    }, [statusFilter, reloadProjects]);

    return (
        <div>
            <div className="heading">
                <Breadcrumb />
                <PaginationV2 page={apiPageNumber} total={numberPages} onPageChange={onPageChange} />

                <div>
                    <RestrictedComponent roles={["administrator", "superuser", "user"]}>
                        <CreateButton onClick={handleCreateProject}>Create project</CreateButton>
                    </RestrictedComponent>
                </div>
            </div>
            <Title title={`Projects (${totalCount})`} />

            <details>
                <summary>Filters</summary>
                <div className="space-x-2 mx-auto flex items-center">
                    <div className="field">
                        <label className="label">Status</label>
                        <div className="control">
                            <NativeSelect onChange={onStatusFilterChange} defaultValue="active">
                                <option value="">(any)</option>
                                <option value="active">Active</option>
                                <option value="archived">Archived</option>
                            </NativeSelect>
                        </div>
                    </div>
                </div>
            </details>

            <ProjectsTable projects={projects} destroy={destroy} />
        </div>
    );
};

export default ProjectsListPage;
