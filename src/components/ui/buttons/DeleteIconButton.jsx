import NativeButton from "components/form/NativeButton";
import styles from "./DeleteIconButton.module.css";

const DeleteIconButton = (props) => (
    <NativeButton className={`button ${styles.native} is-danger`} onClick={props.onClick} {...props}>
        &nbsp;
    </NativeButton>
);

export default DeleteIconButton;
