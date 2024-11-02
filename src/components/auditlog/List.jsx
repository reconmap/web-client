import PaginationV2 from "components/layout/PaginationV2";
import useDocumentTitle from "hooks/useDocumentTitle";
import useQuery from "hooks/useQuery";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import secureApiFetch, { downloadFromApi } from "../../services/api";
import Breadcrumb from "../ui/Breadcrumb";
import ExportButton from "../ui/buttons/Export";
import { IconEye } from "../ui/Icons";
import Title from "../ui/Title";
import AuditLogsTable from "./AuditLogsTable";

const AuditLogList = () => {
    const navigate = useNavigate();
    const query = useQuery();
    let pageNumber = query.get("page");
    pageNumber = pageNumber !== null ? parseInt(pageNumber) : 1;
    const apiPageNumber = pageNumber - 1;

    const [auditLog, setAuditLog] = useState([]);
    const [numberPages, setNumberPages] = useState(1);

    const onPageChange = (pageNumber) => {
        navigate(`/auditlog?page=${pageNumber + 1}`);
    };

    const reloadData = useCallback(() => {
        secureApiFetch(`/auditlog?page=${apiPageNumber}`, { method: "GET" })
            .then((resp) => {
                if (resp.headers.has("X-Page-Count")) {
                    setNumberPages(resp.headers.get("X-Page-Count"));
                }
                return resp.json();
            })
            .then((data) => {
                setAuditLog(data);
            });
    }, [apiPageNumber]);

    useEffect(() => {
        reloadData();
    }, [reloadData]);

    const onExportClick = () => {
        downloadFromApi("/system/data?entities=audit_log");
    };

    useDocumentTitle(`Audit log - Page ${pageNumber}`);

    return (
        <>
            <div className="heading">
                <Breadcrumb>
                    <div>System</div>
                </Breadcrumb>
                <PaginationV2 page={apiPageNumber} total={numberPages} onPageChange={onPageChange} />
                <ExportButton onClick={onExportClick} />
            </div>
            <Title type="System" title="Audit Log" icon={<IconEye />} />
            <AuditLogsTable auditLog={auditLog} />
        </>
    );
};

export default AuditLogList;
