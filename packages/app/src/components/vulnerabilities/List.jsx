import NativeButtonGroup from "components/form/NativeButtonGroup";
import PaginationV2 from "components/layout/PaginationV2";
import RestrictedComponent from "components/logic/RestrictedComponent";
import Breadcrumb from "components/ui/Breadcrumb";
import Title from "components/ui/Title";
import DeleteButton from "components/ui/buttons/Delete";
import { actionCompletedToast } from "components/ui/toast";
import useQuery from "hooks/useQuery";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import secureApiFetch from "../../services/api";
import CreateButton from "../ui/buttons/Create";
import VulnerabilityFilters from "./Filters";
import VulnerabilitiesTable from "./VulnerabilitiesTable";
import VulnerabilityTableModel from "./VulnerabilityTableModel";

const VulnerabilitiesList = () => {
    const navigate = useNavigate();
    const query = useQuery();
    let pageNumber = query.get("page");
    pageNumber = pageNumber !== null ? parseInt(pageNumber) : 1;
    const apiPageNumber = pageNumber - 1;

    const [tableModel, setTableModel] = useState(new VulnerabilityTableModel());

    const [totalCount, setTotalCount] = useState("?");
    const [numberPages, setNumberPages] = useState(1);

    const onPageChange = (pageNumber) => {
        const queryParams = new URLSearchParams();
        queryParams.set("isTemplate", "false");
        queryParams.set("page", pageNumber);
        queryParams.set("orderColumn", tableModel.sortBy.column);
        queryParams.set("orderDirection", tableModel.sortBy.order);
        Object.keys(tableModel.filters).forEach(
            (key) =>
                tableModel.filters[key] !== null &&
                tableModel.filters[key].length !== 0 &&
                queryParams.append(key, tableModel.filters[key]),
        );
        const url = `/vulnerabilities?${queryParams.toString()}`;
        navigate(url);
    };

    const reloadVulnerabilities = useCallback(() => {
        setTableModel((tableModel) => ({
            ...tableModel,
            vulnerabilities: null,
        }));

        const queryParams = new URLSearchParams();
        queryParams.set("isTemplate", "false");
        queryParams.set("page", apiPageNumber);
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
            .then((resp) => {
                if (resp.headers.has("X-Page-Count")) {
                    setNumberPages(resp.headers.get("X-Page-Count"));
                }
                if (resp.headers.has("X-Total-Count")) {
                    setTotalCount(resp.headers.get("X-Total-Count"));
                }
                return resp.json();
            })
            .then((data) => {
                setTableModel((tableModel) => ({
                    ...tableModel,
                    vulnerabilities: data,
                }));
            });
    }, [setTableModel, apiPageNumber, tableModel.filters, tableModel.sortBy.column, tableModel.sortBy.order]);

    const onDeleteButtonClick = () => {
        secureApiFetch("/vulnerabilities", {
            method: "PATCH",
            headers: {
                "Bulk-Operation": "DELETE",
            },
            body: JSON.stringify(tableModel.selection),
        })
            .then(reloadVulnerabilities)
            .then(() => {
                setTableModel({ ...tableModel, selection: [] });
                actionCompletedToast("All selected vulnerabilities were deleted.");
            })
            .catch((err) => console.error(err));
    };

    const onAddVulnerabilityClick = () => {
        navigate(`/vulnerabilities/create`);
    };

    useEffect(() => {
        reloadVulnerabilities();
    }, [reloadVulnerabilities, tableModel.filters]);

    return (
        <>
            <div className="heading">
                <Breadcrumb />
                <PaginationV2 page={apiPageNumber} total={numberPages} onPageChange={onPageChange} />
                <div>
                    <NativeButtonGroup>
                        <CreateButton onClick={onAddVulnerabilityClick}>Add vulnerability</CreateButton>
                        <RestrictedComponent roles={["administrator", "superuser", "user"]}>
                            <DeleteButton onClick={onDeleteButtonClick} disabled={!tableModel.selection.length}>
                                Delete selected
                            </DeleteButton>
                        </RestrictedComponent>
                    </NativeButtonGroup>
                </div>
            </div>
            <Title title={`Vulnerabilities (${totalCount})`} />
            <VulnerabilityFilters tableModel={tableModel} tableModelSetter={setTableModel} />
            <VulnerabilitiesTable
                tableModel={tableModel}
                tableModelSetter={setTableModel}
                reloadCallback={reloadVulnerabilities}
            />
        </>
    );
};

export default VulnerabilitiesList;
