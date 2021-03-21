import FileSizeSpan from "components/ui/FileSizeSpan";
import Loading from "components/ui/Loading";
import useFetch from "hooks/useFetch";
import React from "react";
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

        <table>
            <thead>
                <tr>
                    <th>Metric</th>
                    <th>Usage</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Attachments total count</td>
                    <td>{usage.attachments.total_count}</td>
                </tr>
                <tr>
                    <td>Attachments total disk usage</td>
                    <td><FileSizeSpan fileSize={usage.attachments.total_file_size} /></td>
                </tr>
            </tbody>
        </table>

    </div>
};

export default SystemUsagePage;
