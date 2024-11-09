import NativeButton from "components/form/NativeButton";
import CssIcon from "../CssIcon";

const DeleteIconButton = (props) => (
    <NativeButton className={`button is-danger`} onClick={props.onClick} {...props}>
        <CssIcon name="trash" />
    </NativeButton>
);

export default DeleteIconButton;
