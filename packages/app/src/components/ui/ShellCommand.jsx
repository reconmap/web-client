import NativeButton from "components/form/NativeButton";
import { useRef } from "react";
import { actionCompletedToast } from "../../components/ui/toast";
import "./ShellCommand.css";

const ShellCommand = ({ children, showPrompt = true }) => {
    const codeRef = useRef();

    const handleCopy = () => {
        const code = codeRef.current.innerText;

        navigator.clipboard.writeText(code).then(
            () => {
                actionCompletedToast("Copied to clipboard");
            },
            () => {},
        );
    };

    return (
        <code className={showPrompt ? "prompt" : ""} ref={codeRef}>
            {children}
            <NativeButton onClick={handleCopy}>📋</NativeButton>
        </code>
    );
};

export default ShellCommand;
