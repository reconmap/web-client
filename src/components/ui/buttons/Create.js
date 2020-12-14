import {IconPlus} from "../Icons";
import PrimaryButton from "./Primary";

const CreateButton = ({onClick, children, fontSize}) =>
    <PrimaryButton onClick={onClick} fontSize={fontSize}>
        <IconPlus/>
        {children || "Create"}
    </PrimaryButton>

export default CreateButton
