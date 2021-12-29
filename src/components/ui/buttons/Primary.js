import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PrimaryButton = ({
    type,
    onClick,
    children,
    disabled = false,
    to,
    external = false,
    ...props
}) => {
    const navigate = useNavigate();
    const handleOpen = () => {
        external ? window.open(to, '_blank') : navigate(to)
    }

    return (
        <Button {...props} type={type ? type : "button"} onClick={onClick || handleOpen} isDisabled={disabled}>
            {children}
        </Button>
    )
}

export default PrimaryButton;
