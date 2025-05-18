import HorizontalLabelledField from "components/form/HorizontalLabelledField.js";
import NativeButton from "components/form/NativeButton";
import NativeInput from "components/form/NativeInput";
import NativeSelect from "components/form/NativeSelect.jsx";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import CommandTerminal from "components/ui/CommandTerminal";
import ExternalLink from "components/ui/ExternalLink";
import ShellCommand from "components/ui/ShellCommand";
import { actionCompletedToast, errorToast } from "components/ui/toast";
import cronstrue, { toString as CronExpressionToString } from "cronstrue";
import useFetch from "hooks/useFetch";
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { CliDownloadUrl } from "ServerUrls";
import secureApiFetch from "services/api";
import CommandService from "services/command";
import parseArguments from "services/commands/arguments";

const CommandInstructions = ({ command, task = null }) => {
    const [commandUsages] = useFetch(`/commands/${command?.id}/usages`);
    const [scheduledCommands, fetchScheduledCommands] = useFetch(`/commands/${command?.id}/schedules`);

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
            {scheduledCommands && (
                <table className="table">
                    <caption>Scheduled commands</caption>
                    <thead>
                        <tr>
                            <th>Cron expression</th>
                            <th>Description</th>
                            <th>Argument values</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scheduledCommands.map((scheduleCommand) => (
                            <tr>
                                <td>{scheduleCommand.cron_expression}</td>
                                <td>
                                    {CronExpressionToString(scheduleCommand.cron_expression, {
                                        throwExceptionOnParseError: false,
                                    })}
                                </td>
                                <td>{scheduleCommand.argument_values}</td>
                                <td>
                                    <DeleteIconButton onClick={(ev) => deleteScheduledCommand(ev, scheduleCommand)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

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
                    <h4>Instructions for command "{command.name}"</h4>
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

    useEffect(() => {
        const commandArgsRendered = CommandService.renderArguments(usage, commandArgs);
        setCommandArgsRendered(commandArgsRendered);
    }, [commandArgs]);

    const [cronExpresion, setCronExpresion] = useState("");
    const [isCronExpressionInvalid, setCronExpressionInvalid] = useState(true);
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
            setCronExpressionInvalid(false);
        } catch (err) {
            setCronExpressionInvalid(true);
            setCronExpressionErrorMessage(err.message);
        }
    };
    const deleteScheduledCommand = (ev, commandSchedule) => {
        secureApiFetch(`/commands/schedules/${commandSchedule.id}`, {
            method: "DELETE",
        })
            .then(() => {
                fetchScheduledCommands();
                actionCompletedToast("The scheduled command has been deleted.");
            })
            .catch((err) => console.error(err));
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
                    fetchScheduledCommands();
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
            <h4>1. Fill in the arguments</h4>
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
            <h4>
                2. Execute <strong>rmap</strong> on any terminal
            </h4>
            <div>
                Make sure you have a copy of <strong>rmap</strong> on a machine you trust. Download the CLI for
                Macos/Linux and Windows from <ExternalLink href={CliDownloadUrl}>Github</ExternalLink>.<br />
                Once <strong>rmap</strong> is within reach execute the command shown below.
                <ShellCommand>
                    {CommandService.generateEntryPoint(command, usage, task)} {commandArgsRendered}
                </ShellCommand>
                <NativeButton onClick={runOnTerminal}>Run on a browser terminal</NativeButton>
                {showTerminal && (
                    <CommandTerminal
                        commands={[CommandService.generateEntryPoint(command, usage, task) + " " + commandArgsRendered]}
                    />
                )}
            </div>

            {task && command.output_filename && (
                <>
                    <h4>3. Wait for results</h4>

                    <div>
                        The <strong>rmap</strong> command will automatically capture the output of the previous command
                        and upload it to the server for analysis. If there are new hosts discovered, or new
                        vulnerabilities detected, they will be reported in the dashboard.
                    </div>
                </>
            )}

            <h3>Run on schedule</h3>
            <div isInvalid={isCronExpressionInvalid}>
                <label>Cron expression</label>
                <HorizontalLabelledField
                    label="Cron expression"
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
                <div>
                    Learn about cron expressions{" "}
                    <ExternalLink href="https://en.wikipedia.org/wiki/Cron#CRON_expression">here</ExternalLink>
                </div>
            </div>
            <NativeButton
                disabled={cronExpresion === ""}
                onClick={(ev) => saveScheduledCommand(ev, command, usage, commandArgsRendered)}
            >
                Save scheduled command
            </NativeButton>
        </>
    );
};

export default CommandInstructions;
