import NativeButton from "./NativeButton.jsx";

const NativeSubmitButton = ({ children, ...props }) => {
    return (
        <NativeButton type="submit" {...props}>
            {children}
        </NativeButton>
    );
};

export default NativeSubmitButton;
