import React from "react";
import { IconX } from "../../icons";

const DeleteButton = (props) => <button onClick={props.onClick} type="delete">
    <IconX styling='mr-2' />
    {props.children || "Delete"}
</button>

export default DeleteButton
