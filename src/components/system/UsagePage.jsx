import FileSizeSpan from "components/ui/FileSizeSpan";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";
import Breadcrumb from "../ui/Breadcrumb";
import { IconDownloadDocument } from "../ui/Icons";
import Title from "../ui/Title";

const SystemUsagePage = () => {
    const [usage] = useFetch("/system/usage");

    if (!usage) return <Loading />;

    return (
        <div>
            <div className="heading">
                <Breadcrumb />
            </div>
            <Title type="System" title="Usage" icon={<IconDownloadDocument />} />

            <div>
                <dl>
                    <dt>Attachments count</dt>
                    <dd>{usage.attachments.total_count} total</dd>
                </dl>

                <dl>
                    <dt>Attachments total disk usage</dt>
                    <dd>
                        <FileSizeSpan fileSize={usage.attachments.total_file_size} />
                    </dd>
                </dl>
            </div>
        </div>
    );
};

export default SystemUsagePage;
