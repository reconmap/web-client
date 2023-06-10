import PageTitle from "components/logic/PageTitle";
import React from "react";
import Breadcrumb from "../ui/Breadcrumb";
import { IconDownloadDocument } from "../ui/Icons";
import Title from "../ui/Title";
import ImportForm from "./ImportForm";

const ImportPage = () => {
    return <div>
        <div className='heading'>
            <Breadcrumb>
                <div>System</div>
            </Breadcrumb>
        </div>
        <PageTitle value="Import data" />
        <Title title="Data Import" icon={<IconDownloadDocument />} />

        <ImportForm />
    </div>
};

export default ImportPage;
