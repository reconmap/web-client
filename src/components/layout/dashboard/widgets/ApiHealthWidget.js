import useFetch from "hooks/useFetch";

const GreenYes = () => <span style={{ color: 'green' }}>Yes</span>;
const RedNo = () => <span style={{ color: 'red' }}>No</span>;

const ApiHealthWidget = () => {
    const [apiHealth] = useFetch('/system/health');

    return <article className="card">
        <h4>API health</h4>

        {apiHealth && <>
            <dl>
                <dt>Response</dt>
                <dd style={{ color: 'green' }}>Ok</dd>

                <dt>Attachments directory is writeable</dt>
                <dd>{apiHealth.attachmentsDirectory.writeable ? <GreenYes /> : <RedNo />}</dd>

                <dt>Logs directory is writeable</dt>
                <dd>{apiHealth.logsDirectory.writeable ? <GreenYes /> : <RedNo />}</dd>
            </dl>
        </>}
    </article>
}

export default ApiHealthWidget;
