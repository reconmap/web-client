import {IconX} from "../../icons";
import BtnLink from "./BtnLink";

const CancelButton = ({onClick, children}) => <BtnLink onClick={onClick} type="cancel" className="flex">
    <IconX styling='mr-2'/>
    {children || "Cancel"}
</BtnLink>

export default CancelButton
