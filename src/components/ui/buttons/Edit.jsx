import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const EditButton = (props) => {
    const [t] = useTranslation('common');

    return <Button {...props}>{t('ui.button.edit')}</Button>
};

export default EditButton;

