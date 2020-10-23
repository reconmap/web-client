import { IconPlus } from "../../icons";
import BtnSecondary from "./BtnSecondary";

const CreateButton = ({ onClick, children , fontSize}) => 
        <BtnSecondary onClick={onClick} fontSize={fontSize} >
            <IconPlus styling='mr-2' />
            {children || "Create"}
        </BtnSecondary>

export default CreateButton
