import { useRef } from 'react';
import { actionCompletedToast } from '../../components/ui/toast';
import { IconDocumentDuplicate } from './Icons';
import './ShellCommand.scss';

const ShellCommand = ({ children, showPrompt = true }) => {
    const codeRef = useRef();

    const handleCopy = () => {
        const code = codeRef.current.innerText

        const textField = document.createElement('textarea')
        textField.innerText = code
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        actionCompletedToast('Copied to clipboard');
    }

    return <code className={showPrompt ? 'prompt' : ''} ref={codeRef}>
        {children}
        <button onClick={handleCopy}>
            <IconDocumentDuplicate />
        </button>
    </code>
}

export default ShellCommand;
