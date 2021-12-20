import { Stat, StatGroup, StatLabel, StatNumber } from "@chakra-ui/react";
import FileSizeSpan from "components/ui/FileSizeSpan";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";
import Breadcrumb from "../ui/Breadcrumb";
import { IconDownloadDocument } from "../ui/Icons";
import Title from "../ui/Title";

const SystemUsagePage = () => {
    const [usage] = useFetch('/system/usage');

    if (!usage) return <Loading />

    return <div>
        <div className='heading'>
            <Breadcrumb />
        </div>
        <Title type="System" title="Usage" icon={<IconDownloadDocument />} />

        <StatGroup>
            <Stat>
                <StatLabel>Attachments count</StatLabel>
                <StatNumber>{usage.attachments.total_count} total</StatNumber>
            </Stat>

            <Stat>
                <StatLabel>Attachments total disk usage</StatLabel>
                <StatNumber><FileSizeSpan fileSize={usage.attachments.total_file_size} /></StatNumber>
            </Stat>
        </StatGroup>
    </div>
};

export default SystemUsagePage;
