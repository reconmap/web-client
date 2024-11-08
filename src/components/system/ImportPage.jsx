import useDocumentTitle from "hooks/useDocumentTitle";
import Breadcrumb from "../ui/Breadcrumb";
import { IconDownloadDocument } from "../ui/Icons";
import Title from "../ui/Title";
import ImportForm from "./ImportForm";

const ImportPage = () => {
    useDocumentTitle("Import data");

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <div>System</div>
                </Breadcrumb>
            </div>
            <Title title="Data Import" icon={<IconDownloadDocument />} />

            <ImportForm />
        </div>
    );
};

export default ImportPage;
