import useDocumentTitle from "hooks/useDocumentTitle";
import Breadcrumb from "../ui/Breadcrumb";
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
            <Title title="Data Import" />

            <ImportForm />
        </div>
    );
};

export default ImportPage;
