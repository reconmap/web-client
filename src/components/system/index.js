import Breadcrumb from "../ui/Breadcrumb";
import Title from "../ui/Title";
import { IconDownloadDocument } from "../ui/Icons";
import React from "react";

const SystemIndexPage = () => {
    return <div>
        <div className='heading'>
            <Breadcrumb />
        </div>
        <Title title="System" icon={<IconDownloadDocument />} />

        <p>Click on one of the items on the left.</p>

    </div>
};

export default SystemIndexPage;
