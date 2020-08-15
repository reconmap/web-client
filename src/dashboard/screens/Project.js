import React from 'react'

const Project = () => {
    return (
        <>
            <h3>Project foo</h3>

            <a href="">Archive</a> | <a href="">Delete</a> | <a href="generate-map-report.html">Generate recon map report</a> | <a href="generate-report.html">Generate recconnaisance report</a>

            <h2>Description</h2>

            <p>This project was requested by X in order to test project security.</p>

            <h2>Target(s)</h2>

            <ul>
                <li>Host www.fom</li>
                <li>Host www.foa</li>
                <li>Host www.fas</li>
            </ul>

            <h2>Vulnerabilities</h2>

            <p><a href="#">Add Vulnerability</a></p>

            <ul>
                <li>Vulnerability "sql injection" found on host "www.fom" on date 2020-08-12 by user "Ethical hacker 1"</li>
            </ul>

            <h4>Team</h4>

            <a href="">Ethical hacker 1</a>

            <h4>Tasks (1/3 completed)</h4>
            <input type="checkbox" checked="checked" /> Run port scanner (<a href="upload-task-result.html">Upload results</a>)<br />
            <input type="checkbox" /> Run tool X (<a href="#">Upload results</a>)<br />
            <input type="checkbox" /> Run tool Y (<a href="#">Upload results</a>)<br />
            <br />
            <a href="">Add task</a>

            <h4>Audit log</h4>

            <ul>
                <li>2020-08-12 22:26 User "Ethical hacker 1" uploaded results for task "Run port scanner"</li>
            </ul>

            <a href="export">Export audit log</a>
        </>
    )
}

export default Project