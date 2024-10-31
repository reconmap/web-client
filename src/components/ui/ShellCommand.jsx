import { IconButton } from "@chakra-ui/react";
import { useRef } from "react";
import { actionCompletedToast } from "../../components/ui/toast";
import { IconDocumentDuplicate } from "./Icons";
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
            <IconButton onClick={handleCopy} icon={<IconDocumentDuplicate styling={{ width: "32px" }} />} />
        </code>
    );
};

export default ShellCommand;
