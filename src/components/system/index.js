import PageTitle from "components/logic/PageTitle";
import React from "react";
import Breadcrumb from "../ui/Breadcrumb";
import { IconPreferences } from "../ui/Icons";
import Title from "../ui/Title";

const SystemIndexPage = () => {
    return <div>
        <PageTitle value="System"/>
        <div className='heading'>
            <Breadcrumb />
        </div>
        <Title title="System" icon={<IconPreferences />} />

        <p>Click on one of the items on the left.</p>

    </div>
};

export default SystemIndexPage;
