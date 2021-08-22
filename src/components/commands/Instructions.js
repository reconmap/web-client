import ExternalLink from "components/ui/ExternalLink";
import Help from "components/ui/Help";
import ShellCommand from "components/ui/ShellCommand";
import { useEffect, useState } from "react";
import { CliDownloadUrl } from "ServerUrls";
import CommandService from "services/command";

const CommandInstructions = ({ command, task = null }) => {
    const [commandArgsRendered, setCommandArgsRendered] = useState('');
    const [commandArgs, setCommandArgs] = useState({});
    const usesContainer = command.executable_type === 'rmap';

    const onArgUpdate = ev => {
        setCommandArgs({ ...commandArgs, [ev.target.name]: { name: ev.target.name, placeholder: ev.target.value } });
    };

    useEffect(() => {
        if (commandArgs !== null) {
            const commandArgsRendered = CommandService.renderArguments(command, commandArgs);
            setCommandArgsRendered(commandArgsRendered);
        }
    }, [commandArgs, command]);

    useEffect(() => {
        if (command) {
            const commandArgsParsed = CommandService.parseArguments(command);
            setCommandArgs(commandArgsParsed);
        }
    }, [command]);

    if (!CommandService.hasCommand(command)) {
        return <p>This command has no instructions defined.</p>
    }

    return <>
        <h4>Instructions</h4>

        <h4>1. Fill in the arguments</h4>
        {Object.keys(commandArgs).length > 0 &&
            Object.keys(commandArgs).map((key) =>
                <p key={`command_${key}`}>
                    <label htmlFor='commandArg'>
                        {commandArgs[key].name}
                    </label> <br />
                    <input id='commandArg' name={commandArgs[key].name} value={commandArgs[key].placeholder} onChange={onArgUpdate} />
                </p>
            )
        }
        {Object.keys(commandArgs).length === 0 && <p>No arguments required.</p>}
        <h4>2. Execute <strong>rmap</strong> on any terminal</h4>
        <div>
            Make sure you have a copy of <strong>rmap</strong> on a machine you trust. Download the CLI for Macos/Linux and Windows from <ExternalLink href={CliDownloadUrl}>Github</ExternalLink>.<br />
            Once <strong>rmap</strong> is within reach execute the command shown below.
            <ShellCommand>{CommandService.generateEntryPoint(command, task)} {commandArgsRendered}</ShellCommand>
        </div>

        {task && command.output_filename && <>
            <h4>3. Wait for results</h4>

            <div>The <strong>rmap</strong> command will automatically capture the output of the previous command and upload it to the server for analysis. If there are new hosts discovered, or new vulnerabilities detected, they will be reported in the dashboard.</div>
        </>}

        {usesContainer && <Help title='How does it work?'>
            Reconmap will invoke the command <strong>{command.name}</strong> from a <strong>{command.docker_image}</strong> container using the arguments <strong>{command.arguments}</strong> and upload the results to this server for analysis.
        </Help>
        }
    </>
}

export default CommandInstructions;
