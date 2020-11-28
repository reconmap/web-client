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

        <div class="grid grid-cols-2 gap-4">
            <div><ImportForm/></div>
            <div><ExportForm/></div>
        </div>

    </section>
};

export default SystemIndexPage;
