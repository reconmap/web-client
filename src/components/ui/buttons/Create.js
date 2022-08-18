import { useTranslation } from "react-i18next";
import { IconPlus } from "../Icons";
import PrimaryButton from "./Primary";

const CreateButton = ({ onClick, children }) => {
    const [t] = useTranslation('common');

    return <PrimaryButton onClick={onClick} leftIcon={<IconPlus styling={{ width: 24 }} />}>
        {children || t("ui.button.create")}
    </PrimaryButton>
}

export default CreateButton;
