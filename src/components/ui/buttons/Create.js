import { IconPlus } from "../Icons";
import PrimaryButton from "./Primary";

const CreateButton = ({ onClick, children }) =>
    <PrimaryButton onClick={onClick} leftIcon={<IconPlus styling={{ width: 24 }} />}>
        {children || "Create"}
    </PrimaryButton>

export default CreateButton;
