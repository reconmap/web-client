import { Textarea } from "@chakra-ui/react";
import Loading from "components/ui/Loading";
import React, { useEffect, useState } from "react";
import secureApiFetch from "services/api";
import Breadcrumb from "../ui/Breadcrumb";
import { IconDownloadDocument } from "../ui/Icons";
import Title from "../ui/Title";

const SystemLogsPage = () => {
    const [logs, setLogs] = useState(null);

    useEffect(() => {
        secureApiFetch('/system/logs', { method: 'GET' })
            .then(response => response.text())
            .then(text => setLogs(text));
    }, []);

    if (!logs) return <Loading />

    return <div style={{ height: '100%' }}>
        <div className='heading'>
            <Breadcrumb />
        </div>
        <Title type="System" title="Logs" icon={<IconDownloadDocument />} />

        <Textarea variant="filled" isReadOnly size="sm" style={{ height: '100%' }}>
            {logs}
        </Textarea>

    </div>
};

export default SystemLogsPage;
