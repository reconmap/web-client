import React from 'react'

const Reports = () => {
    React.useEffect(() => { document.title = 'Reports | Reconmap'; },[]);

    return (
        <div>
            <div className='heading'>
                <h1>Reports</h1>
                <button ><i data-feather='plus' className='mr-2'/> Create Report</button>
            </div>
            <p>Example vulnerability report. Download <a href="/reports/example.docx">Word</a> or <a href="/reports/example.pdf">PDF</a>.</p>
        </div>
    )
}

export default Reports