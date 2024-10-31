import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NativeButton from "components/form/NativeButton";
import styles from "./DeleteIconButton.module.css";

const DeleteIconButton = (props) => (
    <NativeButton className={styles.native} onClick={props.onClick} {...props}>
        <FontAwesomeIcon icon={faTrashCan} />
    </NativeButton>
);

export default DeleteIconButton;
