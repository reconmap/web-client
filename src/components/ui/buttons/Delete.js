import {IconX} from "../../icons";
import BtnSecondary from './../buttons/BtnSecondary'

const DeleteButton = (props) => <BtnSecondary  onClick={props.onClick} {...props}>
    <IconX/>
    {props.children || "Delete"}
</BtnSecondary>

export default DeleteButton
