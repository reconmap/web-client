import PageTitle from "components/logic/PageTitle";
import { WebsocketContext } from "contexts/WebsocketContext";
import { useContext } from "react";
import convertReadyStateToText from "utilities/WebsocketState";
import useFetch from "../../hooks/useFetch";
import Breadcrumb from "../ui/Breadcrumb";
import { IconCheck } from "../ui/Icons";
import Title from "../ui/Title";

const GreenYes = ({ label = "Yes" }) => <span style={{ color: "green" }}>{label}</span>;
const RedNo = () => <span style={{ color: "red" }}>No</span>;

const SystemHealthPage = () => {
    const wsContextData = useContext(WebsocketContext);
    const [apiHealth] = useFetch("/system/health");

    return (
        <div>
            <PageTitle value="System health" />
            <div className="heading">
                <Breadcrumb>
                    <div>System</div>
                </Breadcrumb>
            </div>
            <Title title="System health" icon={<IconCheck />} />

            {apiHealth && (
                <>
                    <table className="table">
                        <caption>API health</caption>
                        <tbody>
                            <tr>
                                <td>Response</td>
                                <td width="20%">
                                    <GreenYes label="Ok" />
                                </td>
                            </tr>
                            <tr>
                                <td>Database connection</td>
                                <td>{apiHealth.dbConnection.ping ? <GreenYes label="Ok" /> : <RedNo />}</td>
                            </tr>
                            <tr>
                                <td>Attachments directory exists</td>
                                <td>{apiHealth.attachmentsDirectory.exists ? <GreenYes /> : <RedNo />}</td>
                            </tr>
                            <tr>
                                <td>Attachments directory is writeable</td>
                                <td>{apiHealth.attachmentsDirectory.writeable ? <GreenYes /> : <RedNo />}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="table">
                        <caption>Websocket health</caption>
                        <tbody>
                            <tr>
                                <td>Connection status</td>
                                <td width="20%">{convertReadyStateToText(wsContextData.connection)}</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default SystemHealthPage;
