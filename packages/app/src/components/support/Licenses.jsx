import NativeTextArea from "components/form/NativeTextArea";
import Title from "components/ui/Title";
import Licenses from "data/licenses.json";
import useDocumentTitle from "hooks/useDocumentTitle";
import Breadcrumb from "../ui/Breadcrumb";

const LicensesPage = () => {
    useDocumentTitle("Licenses");

    return (
        <div>
            <div className="heading">
                <Breadcrumb />
            </div>
            <Title title="Licenses" />

            <NativeTextArea readOnly>{JSON.stringify(Licenses, null, 2)}</NativeTextArea>
        </div>
    );
};

export default LicensesPage;
