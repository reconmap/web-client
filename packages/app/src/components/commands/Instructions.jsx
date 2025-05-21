import HorizontalLabelledField from "components/form/HorizontalLabelledField.js";
import NativeButton from "components/form/NativeButton";
import NativeInput from "components/form/NativeInput";
import NativeSelect from "components/form/NativeSelect.jsx";
import CommandTerminal from "components/ui/CommandTerminal";
import ExternalLink from "components/ui/ExternalLink";
import ShellCommand from "components/ui/ShellCommand";
import { actionCompletedToast, errorToast } from "components/ui/toast";
import cronstrue from "cronstrue";
import useFetch from "hooks/useFetch";
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { CliDownloadUrl } from "ServerUrls";
import secureApiFetch from "services/api";
import CommandService from "services/command";
import parseArguments from "services/commands/arguments";

const CommandInstructions = ({ command, task = null }) => {
    const [commandUsages] = useFetch(`/commands/${command?.id}/usages`);

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
                    <UsageDetail command={command} task={task} usage={usage} />
                </>
            )}
        </>
    );
};

const UsageDetail = ({ command, task, usage }) => {
    const [commandArgsRendered, setCommandArgsRendered] = useState("");
    const [commandArgs, setCommandArgs] = useState(parseArguments(usage));
    const [showTerminal, setShowTerminal] = useState(false);
    const [runFrequency, setRunFrequency] = useState("once");
    const [terminalEnvironment, setTerminalEnvironment] = useState("browser");

    useEffect(() => {
        const commandArgsRendered = CommandService.renderArguments(usage, commandArgs);
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
            argument_values: CommandService.generateEntryPoint(command, usage, task) + " " + commandArgsRendered,
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
            <h5 className="title is-5">1. Fill in the arguments</h5>
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

            {task && command.output_filename && (
                <>
                    <h5 className="title is-5">3. Wait for results</h5>

                    <div>
                        The <strong>rmap</strong> command will automatically capture the output of the previous command
                        and upload it to the server for analysis. If there are new hosts discovered, or new
                        vulnerabilities detected, they will be reported in the dashboard.
                    </div>
                </>
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
                                CommandService.generateEntryPoint(command, usage, task) + " " + commandArgsRendered,
                            ]}
                        />
                    )}
                </>
            )}

            {runFrequency === "once" && terminalEnvironment === "desktop" && (
                <>
                    <h5 className="title is-5">
                        2. Execute <strong>rmap</strong> on any terminal
                    </h5>
                    <div>
                        Make sure you have a copy of <strong>rmap</strong> on a machine you trust. Download the CLI for
                        Macos/Linux and Windows from <ExternalLink href={CliDownloadUrl}>Github</ExternalLink>.<br />
                        Once <strong>rmap</strong> is within reach execute the command shown below.
                        <ShellCommand>
                            {CommandService.generateEntryPoint(command, usage, task)} {commandArgsRendered}
                        </ShellCommand>
                    </div>
                </>
            )}
        </>
    );
};

export default CommandInstructions;
