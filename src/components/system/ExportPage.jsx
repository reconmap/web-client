import useDocumentTitle from "hooks/useDocumentTitle";
import Breadcrumb from "../ui/Breadcrumb";
import Title from "../ui/Title";
import ExportForm from "./ExportForm";

const ExportPage = () => {
    useDocumentTitle("Export data");

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <div>System</div>
                </Breadcrumb>
            </div>
            <Title title="Data Export" />

            <ExportForm />
        </div>
    );
};

export default ExportPage;
