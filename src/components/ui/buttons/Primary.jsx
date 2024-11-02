import NativeButton from "components/form/NativeButton";

const PrimaryButton = ({ type, onClick, children, disabled = false, external = false, ...props }) => {
    return (
        <NativeButton
            className="button is-primary"
            {...props}
            type={type ? type : "button"}
            onClick={onClick}
            isDisabled={disabled}
        >
            {children}
        </NativeButton>
    );
};

export default PrimaryButton;
