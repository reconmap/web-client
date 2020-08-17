import React from 'react'

const Reports = () => {
    React.useEffect(() => { document.title = 'Reports | Reconmap'; },[]);

    return (
        <div>Example vulnerability report. Download <a href="/reports/example.docx">Word</a> or <a href="/reports/example.pdf">PDF</a>.</div>
    )
}

export default Reports