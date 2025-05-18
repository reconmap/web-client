import NativeButtonGroup from "components/form/NativeButtonGroup";
import NativeTabs from "components/form/NativeTabs";
import RestrictedComponent from "components/logic/RestrictedComponent";
import CommandTerminal from "components/ui/CommandTerminal";
import EmptyField from "components/ui/EmptyField";
import ExternalLink from "components/ui/ExternalLink";
import Tags from "components/ui/Tags";
import TimestampsSection from "components/ui/TimestampsSection";
import Title from "components/ui/Title";
import LinkButton from "components/ui/buttons/Link";
import UserLink from "components/users/Link";
import { WebsocketContext } from "contexts/WebsocketContext.jsx";
import CommandUsage from "models/CommandUsage";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router-dom";
import secureApiFetch from "services/api";
import useDelete from "../../hooks/useDelete.js";
import useFetch from "../../hooks/useFetch.js";
import Breadcrumb from "../ui/Breadcrumb.jsx";
import Loading from "../ui/Loading.jsx";
import DeleteButton from "../ui/buttons/Delete.jsx";
import CommandInstructions from "./Instructions.jsx";
import CommandOutputs from "./Outputs.jsx";
import CommandUsageForm from "./UsageForm.jsx";

const CommandDetailsPage = () => {
    const [t] = useTranslation();

    const wsContextData = useContext(WebsocketContext);

    const { commandId } = useParams();
    const navigate = useNavigate();

    const [tabIndex, tabIndexSetter] = useState(0);

    const [command] = useFetch(`/commands/${commandId}`);
    const deleteClient = useDelete(`/commands/`);

    const handleDelete = async () => {
        const confirmed = await deleteClient(commandId);
        if (confirmed) navigate("/commands");
    };

    const defaultCommmandUsage = { command_id: commandId, ...CommandUsage };
    const [commandUsage, setCommandUsage] = useState(defaultCommmandUsage);

    const onCommandUsageSubmit = (ev) => {
        ev.preventDefault();

        secureApiFetch(`/commands/${commandId}/usages`, {
            method: "POST",
            body: JSON.stringify(commandUsage),
        }).then(() => {
            setCommandUsage(defaultCommmandUsage);
            fetchCommandUsages();
        });
        return false;
    };

    const deleteUsage = (usage) => {
        secureApiFetch(`/commands/usage/${usage.id}`, {
            method: "DELETE",
        }).finally(() => {
            fetchCommandUsages();
        });
    };

    const [commandUsages, fetchCommandUsages] = useFetch(`/commands/${commandId}/usages`);

    if (!command) {
        return <Loading />;
    }

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/commands">Commands</Link>
                </Breadcrumb>
                <NativeButtonGroup>
                    <RestrictedComponent roles={["administrator", "superuser", "user"]}>
                        <LinkButton href={`/commands/${command.id}/edit`}>Edit</LinkButton>
                        <DeleteButton onClick={handleDelete} />
                    </RestrictedComponent>
                </NativeButtonGroup>
            </div>
            <article>
                <div>
                    <Title type={t("Command")} title={command.name} />
                    <Tags values={command.tags} />
                </div>

                <NativeTabs
                    labels={[t("Details"), t("Usages"), "Run instructions", "Command outputs", "Terminal"]}
                    tabIndex={tabIndex}
                    tabIndexSetter={tabIndexSetter}
                />

                <div>
                    <div>
                        {0 === tabIndex && (
                            <div className="content">
                                <div className="grid grid-two">
                                    <div>
                                        <dl>
                                            <dt>{t("Description")}</dt>
                                            <dd>
                                                {command.description ? (
                                                    <ReactMarkdown>{command.description}</ReactMarkdown>
                                                ) : (
                                                    <EmptyField />
                                                )}
                                            </dd>

                                            {command.output_parser && (
                                                <>
                                                    <dt>Output parser support</dt>
                                                    <dl>Yes ({command.output_parser})</dl>
                                                </>
                                            )}
                                            {command.more_info_url && (
                                                <>
                                                    <dt>More information URL</dt>
                                                    <dl>
                                                        {command.more_info_url ? (
                                                            <ExternalLink href={command.more_info_url}>
                                                                {command.more_info_url}
                                                            </ExternalLink>
                                                        ) : (
                                                            <EmptyField />
                                                        )}
                                                    </dl>
                                                </>
                                            )}
                                        </dl>
                                    </div>

                                    <div>
                                        <h4>{t("Relations")}</h4>
                                        <dl>
                                            <dt>Created by</dt>
                                            <dd>
                                                <UserLink userId={command.creator_uid}>
                                                    {command.creator_full_name}
                                                </UserLink>
                                            </dd>
                                        </dl>

                                        <TimestampsSection entity={command} />
                                    </div>
                                </div>
                            </div>
                        )}
                        {1 === tabIndex && (
                            <div>
                                <h3>Usages</h3>

                                <CommandUsageForm
                                    onFormSubmit={onCommandUsageSubmit}
                                    command={commandUsage}
                                    isEditForm={false}
                                    commandSetter={setCommandUsage}
                                />

                                {commandUsages !== null && (
                                    <>
                                        <table className="table is-fullwidth">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Options</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {commandUsages.map((command) => (
                                                    <tr key={command.id}>
                                                        <td>{command.name}</td>
                                                        <td>
                                                            <DeleteButton onClick={(ev) => deleteUsage(command)} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                                )}
                            </div>
                        )}
                        {2 === tabIndex && (
                            <div>
                                {commandUsages !== null && (
                                    <CommandInstructions command={command} usages={commandUsages} />
                                )}
                            </div>
                        )}
                        {3 === tabIndex && (
                            <div>
                                <CommandOutputs command={command} />
                            </div>
                        )}
                        {4 === tabIndex && (
                            <div>
                                {wsContextData.connection.readyState === WebSocket.OPEN ? (
                                    <CommandTerminal commands={[]} />
                                ) : (
                                    <article class="message is-danger">
                                        <div class="message-body">
                                            <strong>Unable to establish connection to the Reconmap agent.</strong>{" "}
                                            Please review the web socket connection settings.
                                        </div>
                                    </article>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </div>
    );
};

export default CommandDetailsPage;
