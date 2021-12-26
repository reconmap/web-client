import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SecondaryButton = ({ onClick, children, to, disabled = false, external = false, tooltip }) => {
    const navigate = useNavigate();
    const handleOpen = () => {
        external ? window.open(to, '_blank') : navigate(to)
    }

    return (
        <Button
            title={tooltip} onClick={onClick || handleOpen} disabled={disabled}>
            {children}
        </Button>
    )
}

export default SecondaryButton;
