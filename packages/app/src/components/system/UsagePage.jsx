import FileSizeSpan from "components/ui/FileSizeSpan";
import Loading from "components/ui/Loading";
import useDocumentTitle from "hooks/useDocumentTitle";
import useFetch from "hooks/useFetch";
import Breadcrumb from "../ui/Breadcrumb";
import Title from "../ui/Title";

const SystemUsagePage = () => {
    const [usage] = useFetch("/system/usage");

    useDocumentTitle("System usage");

    if (!usage) return <Loading />;

    return (
        <div>
            <div className="heading">
                <Breadcrumb />
            </div>
            <Title type="System" title="Usage" />

            <div className="content">
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

                <table className="table is-stripped">
                    <thead>
                        <tr>
                            <th>Queue name</th>
                            <th>Queue length</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Emails</td>
                            <td>{usage.queueLengths.emails}</td>
                        </tr>
                        <tr>
                            <td>Tasks</td>
                            <td>{usage.queueLengths.tasks}</td>
                        </tr>
                        <tr>
                            <td>Notifications</td>
                            <td>{usage.queueLengths.notifications}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SystemUsagePage;
