import { requestVulnerabilities } from "api/requests/vulnerabilities.js";
import VulnerabilityTableModel from "components/vulnerabilities/VulnerabilityTableModel";
import { useEffect, useState } from "react";
import VulnerabilitiesTable from "../vulnerabilities/VulnerabilitiesTable";

const VulnerabilitiesSearchResults = ({ keywords, emptyResultsSetter: setEmptyResults }) => {
    const [tableModel, setTableModel] = useState(new VulnerabilityTableModel());

    useEffect(() => {
        const reloadData = () => {
            requestVulnerabilities({ isTemplate: 0, keywords })
                .then((resp) => resp.json())
                .then((vulnerabilities) => {
                    setTableModel((tableModel) => ({ ...tableModel, vulnerabilities: vulnerabilities }));
                    setEmptyResults((emptyResults) =>
                        0 === vulnerabilities.length
                            ? emptyResults.concat("vulnerabilities")
                            : emptyResults.filter((value) => value !== "vulnerabilities"),
                    );
                });
        };

        reloadData();
    }, [keywords, setTableModel, setEmptyResults]);

    if (tableModel.vulnerabilities.length === 0) return <></>;

    return (
        <>
            <h3>{tableModel.vulnerabilities.length} matching vulnerabilities</h3>
            <VulnerabilitiesTable tableModel={tableModel} tableModelSetter={setTableModel} showSelection={false} />
        </>
    );
};

export default VulnerabilitiesSearchResults;
