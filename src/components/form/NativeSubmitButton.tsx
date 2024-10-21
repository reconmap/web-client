import NativeButton from "./NativeButton.js";

const NativeSubmitButton = ({ children, ...props }: any) => {
    return <NativeButton type="submit" {...props}>{children}</NativeButton>
}

export default NativeSubmitButton;
