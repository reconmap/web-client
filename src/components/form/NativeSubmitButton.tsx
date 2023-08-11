import NativeButton from "./NativeButton";

const NativeSubmitButton = ({ children, ...props }: any) => {
    return <NativeButton type="submit" {...props}>{children}</NativeButton>
}

export default NativeSubmitButton;
