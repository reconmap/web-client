import ShellCommand from "components/ui/ShellCommand";
import { useEffect, useState } from "react";
import CommandService from "services/command";

const CommandInstructions = ({ command }) => {
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

    return <>
        <h4>Instructions</h4>

        <h5>1. Fill in the arguments</h5>
        {Object.keys(commandArgs).length > 0 &&
            Object.keys(commandArgs).map((key) =>
                <p>
                    {commandArgs[key].name}<br />
                    <input name={commandArgs[key].name} value={commandArgs[key].placeholder} onChange={onArgUpdate} />
                </p>
            )
        }
        {Object.keys(commandArgs).length === 0 && <p>No arguments required.</p>}
        <h5>2. Run this command</h5>
        <div>
            To run the task execute:
            <ShellCommand>{CommandService.generateEntryPoint(command)} {commandArgsRendered}</ShellCommand>
        </div>

        {usesContainer && <>
            <h4>How does it work?</h4>

            <p>Reconmap will invoke the command <strong>{command.short_name}</strong> from a <strong>{command.docker_image}</strong> container using the arguments <strong>{command.arguments}</strong> and upload the results to this server for analysis.</p>
        </>
        }
    </>
}

export default CommandInstructions;
