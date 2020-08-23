import React from "react";
import {  IconPlus } from "../../icons";

const CreateButton = ({onClick, children}) => <button onClick={onClick} >
        <IconPlus styling='mr-2'/>
        {children || "Create"}
    </button>

export default CreateButton
