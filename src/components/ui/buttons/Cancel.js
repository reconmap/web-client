import React from "react";
import { IconX } from "../../icons";

const CancelButton = ({ onClick, children }) => <button onClick={onClick} type="cancel" className="flex">
    <IconX styling='mr-2'/>
    {children || "Cancel"}
</button>

export default CancelButton
