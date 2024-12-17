import NativeTextArea from "components/form/NativeTextArea";
import Title from "components/ui/Title";
import Licenses from "data/licenses.json";
import useDocumentTitle from "hooks/useDocumentTitle";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../ui/Breadcrumb";

const LicensesPage = () => {
    const [t] = useTranslation();

    useDocumentTitle(t("Licenses"));

    return (
        <div>
            <div className="heading">
                <Breadcrumb />
            </div>
            <Title title={t("Licenses")} />

            <NativeTextArea defaultValue={JSON.stringify(Licenses, null, 2)} rows={20} readOnly />
        </div>
    );
};

export default LicensesPage;
