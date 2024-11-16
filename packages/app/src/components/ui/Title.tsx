import useDocumentTitle from 'hooks/useDocumentTitle.js';
import React from 'react';

type DocumentTitleType = 'none' | 'single' | 'double';

interface TitleProps {
    type?: string;
    title: string;
    documentTitle: DocumentTitleType
}

const Title: React.FC<TitleProps> = ({ type, title, documentTitle = 'double' }) => {
    if(documentTitle != 'none') {
        useDocumentTitle(documentTitle == 'single' || !type ? title : `${title} (${type})`);
    }

    return (
        <div className="mb-5">
            {type && <h2 className="subtitle">{type}</h2>}
            <h1 className="title">{title}</h1>
        </div>
    );
};

export default Title;
