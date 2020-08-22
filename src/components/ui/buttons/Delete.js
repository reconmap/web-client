import React from "react";

const DeleteButton = (props) => <button onClick={props.onClick} type="delete">{props.children || "Delete"}</button>

export default DeleteButton
