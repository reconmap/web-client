import PageTitle from "components/logic/PageTitle";
import React from "react";
import Breadcrumb from "../ui/Breadcrumb";
import { IconQuestionCircle } from "../ui/Icons";
import Title from "../ui/Title";

const HelpIndexPage = () => {
    return <div>
        <PageTitle value="Help and support"/>

        <div className='heading'>
            <Breadcrumb />
        </div>
        <Title title="Help and support" icon={<IconQuestionCircle />} />

        <p>Click on one of the items on the left.</p>

    </div>
};

export default HelpIndexPage;
