import { useCommandUsagesQuery } from "api/commands.js";
import { useProjectsQuery } from "api/projects.js";
import HorizontalLabelledField from "components/form/HorizontalLabelledField.jsx";
import NativeButton from "components/form/NativeButton";
import NativeInput from "components/form/NativeInput";
import NativeSelect from "components/form/NativeSelect.jsx";
import CommandTerminal from "components/ui/CommandTerminal";
import ExternalLink from "components/ui/ExternalLink";
import ShellCommand from "components/ui/ShellCommand";
import { actionCompletedToast, errorToast } from "components/ui/toast";
import cronstrue from "cronstrue";
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { CliDownloadUrl } from "ServerUrls";
import secureApiFetch from "services/api";
import CommandService from "services/command";
import parseArguments from "services/commands/arguments";

const Bullet = () => <span style={{ color: "var(--bulma-primary" }}>▸</span>;

const CommandInstructions = ({ command, projectId = null }) => {
    const { data: commandUsages } = useCommandUsagesQuery(command?.id);

    const [usage, setUsage] = useState(null);

    const onUsageChange = (ev) => {
        const usage = commandUsages.find((usage) => usage.id === parseInt(ev.target.value));
        setUsage(usage || null);
    };

    if (commandUsages == null) {
        return (
            <>
                <p>This command has no instructions defined.</p>
            </>
        );
    }

    return (
        <>
            <NativeSelect onChange={(ev) => onUsageChange(ev)}>
                <option value="0">(select)</option>
                {commandUsages.map((usage) => (
                    <option key={usage.id} value={usage.id}>
                        {usage.name}
                    </option>
                ))}
            </NativeSelect>

            {usage !== null && (
                <>
                    <h4 className="title is-4">Instructions for command "{command.name}"</h4>
                    <UsageDetail projectId={projectId} command={command} usage={usage} />
                </>
            )}
        </>
    );
};

const UsageDetail = ({ projectId: parentProjectId, command, usage }) => {
    const [commandArgsRendered, setCommandArgsRendered] = useState("");
    const [commandArgs, setCommandArgs] = useState(parseArguments(usage));
    const [findingsStorageAction, setFindingsStorageAction] = useState("discard");
    const [showTerminal, setShowTerminal] = useState(false);
    const [runFrequency, setRunFrequency] = useState("once");
    const [projectId, setProjectId] = useState(null);
    const [terminalEnvironment, setTerminalEnvironment] = useState("browser");
    const { data: projects } = useProjectsQuery({ isTemplate: 0, status: "active" });

    useEffect(() => {
        const commandArgsRendered = CommandService.renderArguments(projectId, usage, commandArgs);
        setCommandArgsRendered(commandArgsRendered);
    }, [commandArgs]);

    const [cronExpresion, setCronExpresion] = useState("");
    const [cronExpressionErrorMessage, setCronExpressionErrorMessage] = useState(null);

    const onArgUpdate = (ev, usage) => {
        setCommandArgs({
            ...commandArgs,
            [ev.target.name]: {
                name: ev.target.name,
                placeholder: ev.target.value,
            },
        });
    };

    const runOnTerminal = (ev) => {
        setShowTerminal(true);
    };

    const onCronExpresionChange = (ev) => {
        setCronExpresion(ev.target.value);
        try {
            const message = cronstrue.toString(ev.target.value);
            setCronExpressionErrorMessage(message);
        } catch (err) {
            setCronExpressionErrorMessage(err.message);
        }
    };

    const saveScheduledCommand = (ev, command, usage, commandArgsRendered) => {
        const schedule = {
            command_id: command.id,
            argument_values: CommandService.generateEntryPoint(projectId, command, usage) + " " + commandArgsRendered,
            cron_expression: cronExpresion,
        };

        secureApiFetch(`/commands/${command.id}/schedule`, {
            method: "POST",
            body: JSON.stringify(schedule),
        })
            .then((resp) => {
                if (resp.status === StatusCodes.CREATED) {
                    setCronExpresion("");
                    actionCompletedToast(`The schedule has been saved.`);
                } else {
                    errorToast("The schedule could not be saved. Review the form data or check the application logs.");
                }
            })
            .catch((reason) => {
                errorToast(reason);
            });
    };

    return (
        <>
            <h5 className="title is-5">
                <Bullet /> Fill in the arguments
            </h5>
            {Object.keys(commandArgs).length > 0 &&
                Object.keys(commandArgs).map((key) => (
                    <p key={`command_${key}`}>
                        <label htmlFor="commandArg">{commandArgs[key].name}</label> <br />
                        <NativeInput
                            id="commandArg"
                            name={commandArgs[key].name}
                            value={commandArgs[key].placeholder}
                            onChange={(ev) => onArgUpdate(ev, usage)}
                        />
                    </p>
                ))}
            {Object.keys(commandArgs).length === 0 && <p>No arguments required.</p>}

            <h5 className="title is-5">
                <Bullet /> Configure run
            </h5>

            <HorizontalLabelledField
                label="Findings storage action"
                control={
                    <NativeSelect
                        onChange={(ev) => {
                            setFindingsStorageAction(ev.target.value);
                            if (ev.target.value === "discard") {
                                setProjectId(null);
                            } else {
                                setProjectId(projects.data[0].id);
                            }
                        }}
                    >
                        <option value="discard">Discard (only captures output)</option>
                        <option value="project">Project</option>
                    </NativeSelect>
                }
            />

            {findingsStorageAction === "project" && (
                <HorizontalLabelledField
                    label="Project"
                    htmlFor="projectId"
                    control={
                        <NativeSelect id="projectId" name="project_id" onChange={(ev) => setProjectId(ev.target.value)}>
                            {projects.data.map((project) => (
                                <option value={project.id}>{project.name}</option>
                            ))}
                        </NativeSelect>
                    }
                />
            )}

            <HorizontalLabelledField
                label="Run frequency"
                control={
                    <NativeSelect onChange={(ev) => setRunFrequency(ev.target.value)}>
                        <option value="once">Once</option>
                        <option value="on_schedule">On schedule</option>
                    </NativeSelect>
                }
            />

            {runFrequency === "on_schedule" && (
                <>
                    <HorizontalLabelledField
                        label={
                            <>
                                Cron expression{" "}
                                <div style={{ fontWeight: "normal", fontSize: "0.8em" }}>
                                    Learn about cron expressions{" "}
                                    <ExternalLink href="https://en.wikipedia.org/wiki/Cron#CRON_expression">
                                        here
                                    </ExternalLink>
                                </div>
                            </>
                        }
                        htmlFor="cronExpresion"
                        control={
                            <>
                                <NativeInput
                                    id="cronExpresion"
                                    name="cronExpresion"
                                    type="text"
                                    placeholder="*/1 * * * *"
                                    size="10"
                                    value={cronExpresion}
                                    onChange={onCronExpresionChange}
                                />
                                <div>{cronExpressionErrorMessage}</div>
                            </>
                        }
                    />

                    <NativeButton
                        disabled={cronExpresion === ""}
                        onClick={(ev) => saveScheduledCommand(ev, command, usage, commandArgsRendered)}
                    >
                        Save scheduled command
                    </NativeButton>
                </>
            )}

            {runFrequency === "once" && (
                <>
                    <HorizontalLabelledField
                        label="Terminal environment"
                        control={
                            <NativeSelect onChange={(ev) => setTerminalEnvironment(ev.target.value)}>
                                <option value="browser">Browser</option>
                                <option value="desktop">Desktop</option>
                            </NativeSelect>
                        }
                    />
                </>
            )}

            {runFrequency === "once" && terminalEnvironment === "browser" && (
                <>
                    <NativeButton onClick={runOnTerminal}>Run on a browser terminal</NativeButton>

                    {showTerminal && (
                        <CommandTerminal
                            commands={[
                                CommandService.generateEntryPoint(projectId, command, usage) +
                                    " " +
                                    commandArgsRendered,
                            ]}
                        />
                    )}
                </>
            )}

            {runFrequency === "once" && terminalEnvironment === "desktop" && (
                <>
                    <h5 className="title is-5">
                        <Bullet /> Execute <strong>rmap</strong> on any terminal
                    </h5>
                    <div>
                        Make sure you have a copy of <strong>rmap</strong> on a machine you trust. Download the CLI for
                        Macos/Linux and Windows from <ExternalLink href={CliDownloadUrl}>Github</ExternalLink>.<br />
                        Once <strong>rmap</strong> is within reach execute the command shown below.
                        <ShellCommand>
                            {CommandService.generateEntryPoint(projectId, command, usage)} {commandArgsRendered}
                        </ShellCommand>
                    </div>

                    <h5 className="title is-5">
                        <Bullet /> Wait for results
                    </h5>

                    <div>
                        The <strong>rmap</strong> command will automatically capture the output of the previous command
                        and upload it to the server for analysis. If there are new hosts discovered, or new
                        vulnerabilities detected, they will be reported in the dashboard.
                    </div>
                </>
            )}
        </>
    );
};

export default CommandInstructions;
