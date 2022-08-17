import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const DeleteButton = (props) => {
    const [t] = useTranslation('common');

    return <Button colorScheme="red" onClick={props.onClick} {...props} leftIcon={<DeleteIcon />}>
        {props.children || t("ui.button.delete")}
    </Button>
}

export default DeleteButton;
