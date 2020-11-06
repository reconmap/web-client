import {IconPlus} from "../Icons";
import BtnPrimary from "./BtnPrimary";

const CreateButton = ({onClick, children, fontSize}) =>
    <BtnPrimary onClick={onClick} fontSize={fontSize}>
        <IconPlus/>
        {children || "Create"}
    </BtnPrimary>

export default CreateButton
