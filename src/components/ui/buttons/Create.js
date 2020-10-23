import { IconPlus } from "../../icons";
import BtnSecondary from "./BtnSecondary";

const CreateButton = ({ onClick, children , fontSize}) => 
        <BtnSecondary onClick={onClick} fontSize={fontSize} >
            <IconPlus />
            {children || "Create"}
        </BtnSecondary>

export default CreateButton
