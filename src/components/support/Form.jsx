import Configuration from "Configuration";
import { ServerIssuesUrl } from "ServerUrls";
import NativeTextArea from "components/form/NativeTextArea";
import ExternalLink from "components/ui/ExternalLink";
import PrimaryButton from "components/ui/buttons/Primary";
import { AuthContext } from "contexts/AuthContext";
import { useContext } from "react";
import "./Form.css";

const SupportForm = () => {
    const { user } = useContext(AuthContext);

    const systemInfo = `User
----
ID: ${user.id}
Name: ${user.full_name}
Role: ${user.role}

Client
------
URL: ${document.location.protocol + "//" + document.location.host}
User agent: ${navigator.userAgent}
Version: ${import.meta.env.VITE_VERSION}
Build: ${import.meta.env.VITE_GIT_COMMIT_HASH}

Server
------
API URL: ${Configuration.getDefaultApiUrl()}
Notifications API: ${Configuration.getNotificationsServiceHostPort()}
Agent API: ${Configuration.getAgentServiceHostPort()}
Keycloak URL: ${Configuration.getKeycloakConfig().url}

`;

    const onCopyToClipboardClick = (ev) => {
        ev.preventDefault();

        navigator.clipboard.writeText(systemInfo).then(
            () => {
                ev.target.innerText = "Copied!";
            },
            () => {
                ev.target.innerText = "Unable to copy.";
            },
        );

        const target = ev.target;

        setInterval(() => {
            target.innerText = "Copy to clipboard";
        }, 2000);
    };

    return (
        <div className="support-form">
            <h2>Support information</h2>

            <p>
                If there is something wrong with the app you can report it{" "}
                <ExternalLink href={ServerIssuesUrl}>here</ExternalLink>. Include the information below in the ticket if
                possible as this could accelerate its resolution.
            </p>

            <NativeTextArea id="systemInfoControl" value={systemInfo} readOnly />
            <PrimaryButton onClick={onCopyToClipboardClick}>Copy to clipboard</PrimaryButton>
        </div>
    );
};

export default SupportForm;
