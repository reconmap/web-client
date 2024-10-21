import { IconSave } from 'components/ui/Icons.jsx';
import SecondaryButton from "./Secondary.js";

interface ExportButtonProps {
    onClick: CallableFunction
}

const ExportButton = ({ onClick }: ExportButtonProps) => <SecondaryButton onClick={onClick} leftIcon={<IconSave styling={{ width: 24 }} />}>Export</SecondaryButton>

export default ExportButton;
