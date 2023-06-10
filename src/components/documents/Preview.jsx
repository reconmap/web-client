import ReactMarkdown from 'react-markdown';
import './Preview.scss';

const DocumentPreview = ({ content }) => {
    return <div className="document-preview"><ReactMarkdown>{content}</ReactMarkdown></div>
}

export default DocumentPreview;
