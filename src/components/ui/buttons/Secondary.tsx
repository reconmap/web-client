import { Button } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

interface SecondaryButtonProps {
    onClick: any;
    children: any;
    to?: string;
    disabled?: boolean;
    external?: boolean;
    tooltip?: string;
    leftIcon?: ReactElement
}

const SecondaryButton = ({ onClick, children, to = "", disabled = false, external = false, tooltip, leftIcon = undefined, ...props }: SecondaryButtonProps) => {
    const navigate = useNavigate();
    const handleOpen = () => {
        external ? window.open(to, '_blank') : navigate(to)
    }

    return <Button {...props} leftIcon={leftIcon}
        title={tooltip} onClick={onClick || handleOpen} isDisabled={disabled}>
        {children}
    </Button>
}

export default SecondaryButton;
