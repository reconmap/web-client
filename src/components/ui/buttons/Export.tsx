import SecondaryButton from "./Secondary.js";

interface ExportButtonProps {
    onClick: CallableFunction
}

const ExportButton = ({ onClick }: ExportButtonProps) => <SecondaryButton onClick={onClick}>Export</SecondaryButton>

export default ExportButton;
