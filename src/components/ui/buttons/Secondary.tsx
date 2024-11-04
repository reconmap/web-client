import NativeButton from 'components/form/NativeButton.js';
import { useNavigate } from 'react-router-dom';

interface SecondaryButtonProps {
    onClick: any;
    children: any;
    to?: string;
    disabled?: boolean;
    external?: boolean;
    tooltip?: string;
}

const SecondaryButton = ({ onClick, children, to = "", disabled = false, external = false, tooltip, ...props }: SecondaryButtonProps) => {
    const navigate = useNavigate();
    const handleOpen = () => {
        external ? window.open(to, '_blank') : navigate(to)
    }

    return <NativeButton {...props}
        title={tooltip} onClick={onClick || handleOpen} disabled={disabled}>
        {children}
    </NativeButton>
}

export default SecondaryButton;
