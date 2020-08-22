import React from 'react'

const ReportsList = () => {
    React.useEffect(() => { document.title = 'Reports | Reconmap'; },[]);

    return (
        <div>
            <div className='heading'>
                <h1>Reports</h1>
                <button ><i data-feather='plus' className='mr-2'/> Create Report</button>
            </div>
            <div className='flex flex-wrap gap-4 my-4'>
                <article className='base base-reactive w-48 h-64 justify-end'>
                    <p>This is a brief resume of the report</p>
                    <h2>Report 1</h2>
                </article>
                <article className='base base-reactive w-48 h-64 justify-end'>
                    <p>Velit elit sint ad adipisicing pariatur laboris dolore ut.</p>
                    <h2>Report 2</h2>
                </article>
                <article className='base base-reactive w-48 h-64 justify-end'>
                    <p>Elit nisi in duis nisi.</p>
                    <h2>Report 3</h2>
                </article>
            </div>
        </div>
    )
}

export default ReportsList