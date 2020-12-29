import Breadcrumb from "../ui/Breadcrumb";
import Title from "../ui/Title";
import {IconDownloadDocument} from "../ui/Icons";
import React from "react";
import ImportForm from "./ImportForm";

const ImportPage = () => {
    return <div>
        <div className='heading'>
            <Breadcrumb/>
        </div>
        <Title type="System Data" title="Import" icon={<IconDownloadDocument/>}/>

        <ImportForm/>
    </div>
};

export default ImportPage;
