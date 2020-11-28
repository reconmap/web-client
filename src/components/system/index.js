import ImportForm from "./ImportForm";
import Breadcrumb from "../ui/Breadcrumb";
import Title from "../ui/Title";
import {IconDownloadDocument} from "../ui/Icons";
import React from "react";
import {useHistory} from 'react-router-dom';
import ExportForm from "./ExportForm";

const SystemIndexPage = () => {
    const history = useHistory();
    return <section>
        <div className='heading'>
            <Breadcrumb history={history}/>
        </div>
        <Title type="System" title="Data" icon={<IconDownloadDocument/>}/>

        <ImportForm/>
        <ExportForm/>
    </section>
};

export default SystemIndexPage;
