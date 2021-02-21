import { IconX } from "../Icons";
import SecondaryButton from './../buttons/Secondary';

const DeleteButton = (props) => <SecondaryButton onClick={props.onClick} {...props}>
    <IconX />
    {props.children || "Delete"}
</SecondaryButton>

export default DeleteButton
