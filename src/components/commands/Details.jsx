import {
    ButtonGroup,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import PageTitle from "components/logic/PageTitle";
import RestrictedComponent from "components/logic/RestrictedComponent";
import CommandTerminal from "components/ui/CommandTerminal";
import EmptyField from "components/ui/EmptyField";
import ExternalLink from "components/ui/ExternalLink";
import Tags from "components/ui/Tags";
import TimestampsSection from "components/ui/TimestampsSection";
import LinkButton from "components/ui/buttons/Link";
import UserLink from "components/users/Link";
import CommandUsage from "models/CommandUsage";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router-dom";
import secureApiFetch from "services/api";
import useDelete from "../../hooks/useDelete";
import useFetch from "../../hooks/useFetch";
import Breadcrumb from "../ui/Breadcrumb";
import { IconBriefcase } from "../ui/Icons";
import Loading from "../ui/Loading";
import Title from "../ui/Title";
import DeleteButton from "../ui/buttons/Delete";
import CommandInstructions from "./Instructions";
import CommandOutputs from "./Outputs";
import CommandUsageForm from "./UsageForm";

const CommandDetails = () => {
    const { commandId } = useParams();
    const navigate = useNavigate();

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

    const [commandUsages, fetchCommandUsages] = useFetch(
        `/commands/${commandId}/usages`,
    );

    if (!command) {
        return <Loading />;
    }

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/commands">Commands</Link>
                </Breadcrumb>
                <ButtonGroup>
                    <RestrictedComponent
                        roles={["administrator", "superuser", "user"]}
                    >
                        <LinkButton href={`/commands/${command.id}/edit`}>
                            Edit
                        </LinkButton>
                        <DeleteButton onClick={handleDelete} />
                    </RestrictedComponent>
                </ButtonGroup>
            </div>
            <article>
                <div>
                    <PageTitle value={`${command.name} command`} />

                    <Title
                        type="Command"
                        title={command.name}
                        icon={<IconBriefcase />}
                    />
                    <Tags values={command.tags} />
                </div>

                <Tabs>
                    <TabList>
                        <Tab>Details</Tab>
                        <Tab>Usages</Tab>
                        <Tab>Run instructions</Tab>
                        <Tab>Command outputs</Tab>
                        <Tab>Terminal</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <div className="grid grid-two">
                                <div>
                                    <dl>
                                        <dt>Description</dt>
                                        <dd>
                                            {command.description ? (
                                                <ReactMarkdown>
                                                    {command.description}
                                                </ReactMarkdown>
                                            ) : (
                                                <EmptyField />
                                            )}
                                        </dd>

                                        {command.output_parser && (
                                            <>
                                                <dt>Output parser support</dt>
                                                <dl>
                                                    Yes ({command.output_parser}
                                                    )
                                                </dl>
                                            </>
                                        )}
                                        {command.more_info_url && (
                                            <>
                                                <dt>More information URL</dt>
                                                <dl>
                                                    {command.more_info_url ? (
                                                        <ExternalLink
                                                            href={
                                                                command.more_info_url
                                                            }
                                                        >
                                                            {
                                                                command.more_info_url
                                                            }
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
                                    <h4>Relations</h4>
                                    <dl>
                                        <dt>Created by</dt>
                                        <dd>
                                            <UserLink
                                                userId={command.creator_uid}
                                            >
                                                {command.creator_full_name}
                                            </UserLink>
                                        </dd>
                                    </dl>

                                    <TimestampsSection entity={command} />
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <h3>Usages</h3>

                            <CommandUsageForm
                                onFormSubmit={onCommandUsageSubmit}
                                command={commandUsage}
                                isEditForm={false}
                                commandSetter={setCommandUsage}
                            />

                            {commandUsages !== null && (
                                <>
                                    <table className="rm-listing">
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
                                                        <DeleteButton
                                                            onClick={(ev) =>
                                                                deleteUsage(
                                                                    command,
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            )}
                        </TabPanel>
                        <TabPanel>
                            {commandUsages !== null && (
                                <CommandInstructions
                                    command={command}
                                    usages={commandUsages}
                                />
                            )}
                        </TabPanel>
                        <TabPanel>
                            <CommandOutputs command={command} />
                        </TabPanel>
                        <TabPanel>
                            <CommandTerminal commands={[]} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </article>
        </div>
    );
};

export default CommandDetails;
