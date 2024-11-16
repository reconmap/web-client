import RestrictedComponent from "components/logic/RestrictedComponent";
import TimestampsSection from "components/ui/TimestampsSection";
import VulnerabilityTableModel from "components/vulnerabilities/VulnerabilityTableModel";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import secureApiFetch from "services/api";
import useDelete from "../../hooks/useDelete";
import useFetch from "../../hooks/useFetch";
import Badge from "../badges/Badge";
import Breadcrumb from "../ui/Breadcrumb";
import DeleteButton from "../ui/buttons/Delete";
import Loading from "../ui/Loading";
import Title from "../ui/Title";
import VulnerabilitiesTable from "../vulnerabilities/VulnerabilitiesTable";

const TargetView = () => {
    const navigate = useNavigate();
    const { targetId } = useParams();
    const [target] = useFetch(`/targets/${targetId}`);
    const destroy = useDelete(`/targets/`);
    const [savedProject, setSavedProject] = useState(null);

    const [tableModel, setTableModel] = useState(new VulnerabilityTableModel());

    const fetchVulnerabilities = useCallback(() => {
        const queryParams = new URLSearchParams();
        queryParams.set("targetId", targetId);
        queryParams.set("isTemplate", false);
        queryParams.set("orderColumn", tableModel.sortBy.column);
        queryParams.set("orderDirection", tableModel.sortBy.order);
        Object.keys(tableModel.filters).forEach(
            (key) =>
                tableModel.filters[key] !== null &&
                tableModel.filters[key].length !== 0 &&
                queryParams.append(key, tableModel.filters[key]),
        );
        const url = `/vulnerabilities?${queryParams.toString()}`;
        secureApiFetch(url, { method: "GET" })
            .then((resp) => resp.json())
            .then((data) => {
                setTableModel((tableModel) => ({ ...tableModel, vulnerabilities: data }));
            });
    }, [tableModel.filters, tableModel.sortBy, targetId]);

    useEffect(() => {
        if (target) {
            secureApiFetch(`/projects/${target.project_id}`, { method: "GET", headers: {} })
                .then((resp) => resp.json())
                .then((json) => {
                    setSavedProject(json);
                });
        }
    }, [target]);

    const handleDelete = () => {
        destroy(targetId)
            .then((success) => {
                if (success) navigate("/projects");
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchVulnerabilities();
    }, [fetchVulnerabilities, tableModel.filters]);

    if (!target) return <Loading />;

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                    {savedProject && <Link to={`/projects/${savedProject.id}`}>{savedProject.name}</Link>}
                </Breadcrumb>
                <RestrictedComponent roles={["administrator", "superuser", "user"]}>
                    <DeleteButton onClick={handleDelete} />
                </RestrictedComponent>
            </div>
            <article>
                <div>
                    <Title type="Target" title={target.name} />

                    <div className="grid grid-two">
                        <div>
                            <h4>Kind</h4>
                            <Badge color={target.kind === "hostname" ? "green" : "blue"}>{target.kind}</Badge>
                        </div>

                        <div>
                            <TimestampsSection entity={target} />
                        </div>
                    </div>

                    <h4>Vulnerabilities</h4>
                    <VulnerabilitiesTable
                        tableModel={tableModel}
                        tableModelSetter={setTableModel}
                        reloadCallback={fetchVulnerabilities}
                        showProjectColumn={false}
                        showSelection={false}
                    />
                </div>
            </article>
        </div>
    );
};

export default TargetView;
