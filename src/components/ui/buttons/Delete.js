import { Button } from "@chakra-ui/react";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from "react-i18next";

const DeleteButton = (props) => {
    const [t] = useTranslation('common');

    return <Button colorScheme="red" onClick={props.onClick} {...props} leftIcon={<FontAwesomeIcon icon={faTrashCan} />}>
        {props.children || t("ui.button.delete")}
    </Button>
}

export default DeleteButton;
