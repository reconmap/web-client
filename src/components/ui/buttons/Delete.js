import React from "react";
import { IconX } from "../../icons";
import BtnSecondary from './../buttons/BtnSecondary'
const DeleteButton = (props) => <BtnSecondary onClick={props.onClick} {...props}>
                                    <IconX styling='mr-2' />
                                    {props.children || "Delete"}
                                </BtnSecondary>

export default DeleteButton
