import { IconPlus } from "../Icons";
import PrimaryButton from "./Primary";

const CreateButton = ({ onClick, children }) =>
    <PrimaryButton onClick={onClick}>
        <IconPlus />
        {children || "Create"}
    </PrimaryButton>

export default CreateButton
