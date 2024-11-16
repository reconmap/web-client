import { useCallback, useEffect, useState } from "react";
import secureApiFetch from "../../services/api";
import Breadcrumb from "../ui/Breadcrumb";
import Loading from "../ui/Loading";
import Title from "../ui/Title";
import ReportsTable from "./Table";

const ReportsList = () => {
    const [reports, setReports] = useState([]);

    const reloadReports = useCallback(() => {
        setReports([]);

        secureApiFetch(`/reports?isTemplate=false`, { method: "GET" })
            .then((resp) => resp.json())
            .then((data) => {
                setReports(data);
            });
    }, []);

    useEffect(() => {
        reloadReports();
    }, [reloadReports]);

    return (
        <>
            <div className="heading">
                <Breadcrumb />
            </div>
            <Title title="Reports" />
            {!reports ? (
                <Loading />
            ) : (
                <ReportsTable reports={reports} updateReports={reloadReports} includeProjectColumn={true} />
            )}
        </>
    );
};

export default ReportsList;
