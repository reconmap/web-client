import { Button } from "@chakra-ui/react";

const PrimaryButton = ({
    type,
    onClick,
    children,
    disabled = false,
    external = false,
    ...props
}) => {

    return <Button {...props} type={type ? type : "button"} onClick={onClick} isDisabled={disabled}>
        {children}
    </Button>
}

export default PrimaryButton;
