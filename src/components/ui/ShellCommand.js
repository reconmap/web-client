import { useRef } from 'react';
import { IconDocumentDuplicate } from './Icons';
import './ShellCommand.scss';
import {actionCompletedToast} from '../../components/ui/toast'

const ShellCommand = ({children}) => {
    const codeRef = useRef()
    const handleCopy = () => {
        const code = codeRef.current.innerText
        
        var textField = document.createElement('textarea')
        textField.innerText = code
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        actionCompletedToast('Copied to clipboard');
    
    }
    return <code ref={codeRef}>
            {children}
            <button onClick={handleCopy}>
                <IconDocumentDuplicate />
            </button>
        </code>
}

export default ShellCommand;
