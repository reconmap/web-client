import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface SecondaryButtonProps {
    onClick: any;
    children: any;
    to?: string;
    disabled?: boolean;
    external?: boolean;
    tooltip?: string;
}

const SecondaryButton = ({ onClick, children, to = "", disabled = false, external = false, tooltip }: SecondaryButtonProps) => {
    const navigate = useNavigate();
    const handleOpen = () => {
        external ? window.open(to, '_blank') : navigate(to)
    }

    return <Button
        title={tooltip} onClick={onClick || handleOpen} isDisabled={disabled}>
        {children}
    </Button>
}

export default SecondaryButton;
