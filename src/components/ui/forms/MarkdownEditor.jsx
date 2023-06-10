
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import ReactMde from 'react-mde';
import './MarkdownEditor.css';

const MarkdownEditor = ({ name: editorName, value, onChange: onFormChange }) => {

    const [selectedTab, setSelectedTab] = useState('write');

    return <ReactMde
        value={value}
        onChange={editorValue => onFormChange({ target: { name: editorName, value: editorValue } })}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
            Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
        }
    />
}

export default MarkdownEditor;
