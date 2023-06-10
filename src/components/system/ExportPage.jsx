import PageTitle from "components/logic/PageTitle";
import React from "react";
import Breadcrumb from "../ui/Breadcrumb";
import { IconDownloadDocument } from "../ui/Icons";
import Title from "../ui/Title";
import ExportForm from "./ExportForm";

const ExportPage = () => {
    return <div>
        <div className='heading'>
            <Breadcrumb>
                <div>System</div>
            </Breadcrumb>
        </div>
        <PageTitle value="Export data" />
        <Title title="Data Export" icon={<IconDownloadDocument />} />

        <ExportForm />
    </div>
};

export default ExportPage;
