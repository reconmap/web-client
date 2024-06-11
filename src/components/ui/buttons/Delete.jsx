import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const DeleteButton = (props) => {
    const [t] = useTranslation("common");

    return (
        <button
            style={{ backgroundColor: "lightred", padding: "0" }}
            onClick={props.onClick}
            {...props}
        >
            <FontAwesomeIcon icon={faTrashCan} />{" "}
            {props.children || t("ui.button.delete")}
        </button>
    );
};

export default DeleteButton;
