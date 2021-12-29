import { IconSave } from 'components/ui/Icons';
import SecondaryButton from "./Secondary";

interface ExportButtonProps {
    onClick: CallableFunction
}

const ExportButton = ({ onClick }: ExportButtonProps) => <SecondaryButton onClick={onClick}><IconSave styling={{ width: 24 }} />Export</SecondaryButton>

export default ExportButton;
