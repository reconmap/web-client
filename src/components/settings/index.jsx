import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageTitle from "components/logic/PageTitle";
import React from "react";
import Breadcrumb from "../ui/Breadcrumb";
import Title from "../ui/Title";

const SettingsIndexPage = () => {
    return <div>
        <PageTitle value="Settings" />
        <div className='heading'>
            <Breadcrumb />
        </div>
        <Title title="Settings" icon={<FontAwesomeIcon icon={faWrench} />} />

        <p>Click on one of the items on the left.</p>
    </div>
};

export default SettingsIndexPage;
