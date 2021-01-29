import './Form.css';

const SupportForm = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    const systemInfo = `User
----
ID: ${user.id}
Name: ${user.full_name}

Client
------
URL: ${document.location.protocol + "//" + document.location.host}
User agent: ${navigator.userAgent}
Version: ${process.env.REACT_APP_VERSION}
Build: ${process.env.REACT_APP_GIT_COMMIT_HASH}

Server
------
API URL: ${window.env.REACT_APP_API_ENDPOINT}
WebSocket URL: ${window.env.REACT_APP_WS_ENDPOINT}

`;

    const onCopyToClipboardClick = (ev) => {
        ev.preventDefault();

        document.getElementById('systemInfoControl').select();
        document.execCommand('copy');

        ev.target.innerText = 'Copied!';

        const target = ev.target;

        setInterval(() => {
            target.innerText = 'Copy to clipboard';
        }, 2000);
    }

    return <div className="SupportForm">
        <h2>Support</h2>

        <p>If there is something wrong with the app you can report it <a
            href="https://github.com/Reconmap/web-client/issues">here</a>. Include the information below in the ticket
            if possible as this could accelerate its resolution.</p>

        <textarea id="systemInfoControl" value={systemInfo} readOnly/>
        <button onClick={onCopyToClipboardClick}>Copy to clipboard</button>
    </div>
}

export default SupportForm
