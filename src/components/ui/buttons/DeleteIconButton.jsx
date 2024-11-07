import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NativeButton from "components/form/NativeButton";
import styles from "./DeleteIconButton.module.css";

const DeleteIconButton = (props) => (
    <NativeButton className={`button ${styles.native} is-danger`} onClick={props.onClick} {...props}>
        <FontAwesomeIcon icon={faTrashCan} />
        &nbsp;
    </NativeButton>
);

export default DeleteIconButton;
