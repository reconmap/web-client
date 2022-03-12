import { Button, Textarea } from "@chakra-ui/react";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "hooks/useFetch";
import Breadcrumb from "../ui/Breadcrumb";
import { IconDownloadDocument } from "../ui/Icons";
import Title from "../ui/Title";

const SystemLogsPage = () => {
    const [logs, fetchLogs] = useFetch('/system/logs', true);

    const isLoading = null === logs;

    return <div style={{ height: '100%' }}>
        <div className='heading'>
            <Breadcrumb />
        </div>
        <Title type="System" title="Logs" icon={<IconDownloadDocument />} />

        <Button leftIcon={<FontAwesomeIcon icon={faRefresh} />} onClick={fetchLogs} disabled={isLoading}>Refresh</Button>
        <Textarea variant="filled" size="sm" style={{ height: '100%' }} value={isLoading ? "Loading..." : logs} isReadOnly />
    </div>
};

export default SystemLogsPage;
