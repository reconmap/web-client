
import { SetStateAction, useState } from 'react';
import './MarkdownEditor.css';

import MDEditor from "@uiw/react-md-editor";
import Configuration from 'Configuration';
import secureApiFetch from 'services/api';

const fileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('parentType', "project");
    formData.append('parentId', "1");
    formData.append('attachment[]', file);

    let uri = '/attachments';

    const resp = await secureApiFetch(uri, {
        method: 'POST',
        body: formData
    });
    const json = await resp.json();
    var attachmentId = json[0].id;
    return Configuration.getDefaultApiUrl() + `/image/${attachmentId}`
}

const insertToTextArea = (textarea: any, intsertString: string) => {
    let sentence = textarea.value;
    const len = sentence.length;
    const pos = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const front = sentence.slice(0, pos);
    const back = sentence.slice(pos, len);

    sentence = front + intsertString + back;

    textarea.value = sentence;
    textarea.selectionEnd = end + intsertString.length;

    return sentence;
};

const onImagePasted = async (ev: any, setMarkdown: (value: SetStateAction<string | undefined>) => void) => {
    const dataTransfer = ev.clipboardData;
    const files: File[] = [];
    for (let index = 0; index < dataTransfer.items.length; index += 1) {
        const file = dataTransfer.files.item(index);

        if (file) {
            files.push(file);
        }
    }

    const a = await Promise.all(
        files.map(async (file) => {
            const url = await fileUpload(file);
            const insertedMarkdown = insertToTextArea(ev.target, `![${file.name}](${url})`);
            if (!insertedMarkdown) {
                return;
            }
            setMarkdown(insertedMarkdown);
            return insertedMarkdown;
        }),
    );

    return a.join('');
};

interface MarkdownEditorProps {
    name: string;
    value: string;
    onChange: any
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ name: editorName, value, onChange: onFormChange }) => {

    const [markdown, setMarkdown] = useState<string | undefined>(value);

    const onEditorPaste = async (ev: any) => {
        const a = await onImagePasted(ev, setMarkdown);
        onFormChange({ target: { name: editorName, value: a } });
    }

    return <MDEditor height={200} value={markdown}
        onPaste={onEditorPaste}
        onChange={editorValue => {
            setMarkdown(editorValue);
            onFormChange({ target: { name: editorName, value: editorValue } });
        }
        } />
}

export default MarkdownEditor;
