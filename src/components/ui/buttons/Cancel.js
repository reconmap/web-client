import {IconX} from "../Icons";
import LinkButton from "./LinkButton";

const CancelButton = ({onClick, children}) => <LinkButton onClick={onClick} type="cancel" className="flex">
    <IconX/>
    {children || "Cancel"}
</LinkButton>

export default CancelButton
