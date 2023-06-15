
import './MarkdownEditor.css';

import MDEditor from "@uiw/react-md-editor";

const MarkdownEditor = ({ name: editorName, value, onChange: onFormChange }) => {

    return <MDEditor height={200} value={value} onChange={editorValue => onFormChange({ target: { name: editorName, value: editorValue } })} />
}

export default MarkdownEditor;
