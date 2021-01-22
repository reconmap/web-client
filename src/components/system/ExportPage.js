import Breadcrumb from "../ui/Breadcrumb";
import Title from "../ui/Title";
import { IconDownloadDocument } from "../ui/Icons";
import React from "react";
import ExportForm from "./ExportForm";

const ExportPage = () => {
    return <div>
        <div className='heading'>
            <Breadcrumb>
                <div>System</div>
            </Breadcrumb>
        </div>
        <Title title="Data Export" icon={<IconDownloadDocument />} />

        <ExportForm />
    </div>
};

export default ExportPage;
