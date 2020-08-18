import React from 'react'

const UploadTaskResult = () => {
    React.useEffect(() => { document.title = 'Upload Task | Reconmap'; },[]);

    return (
        <>
        
<h2>Task: Run port scanner </h2>

Command: 

<code>
    <pre>
nmap -v -O www.fom
nmap -v -O www.foa
nmap -v -O www.fas
</pre>
</code>

<form action="project.html">
    <input type="file" />
    <button>Upload results</button>
</form>
        </>
    )
}

export default UploadTaskResult