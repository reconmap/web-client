import { Command } from "models/Command.js";
import { CommandUsage } from "models/CommandUsage.js";
import parseArguments, { CommandArgumentsMap } from "./commands/arguments.js";

const HostCommandLineGenerator = {
    generateEntryPoint: (projectId: number, command: CommandUsage) => {
        return command.executable_path;
    },

    renderArguments: (projectId: number, command: CommandUsage, commandArgs: any = null) => {
        if (commandArgs === null) {
            commandArgs = parseArguments(command);
        }

        let commandArgsRendered = "";

        commandArgsRendered = command.arguments ?? "";
        Object.keys(commandArgs).forEach((key) => {
            let containerArg = commandArgs[key];
            commandArgsRendered = commandArgsRendered.replace(
                new RegExp(`{{{${containerArg.name}\\|\\|\\|.*?}}}`),
                containerArg.placeholder,
            );
        });

        return commandArgsRendered;
    },
};

const RmapCommandLineGenerator = {
    generateEntryPoint: (projectId: number, command: Command, usage: CommandUsage, task = null) => {
        let commandParts = ["rmap", "command run"];
        if (projectId !== null) {
            commandParts.push(`-pid ${projectId}`);
        }
        commandParts.push(`-cuid ${usage.id}`);
        let entryPoint = commandParts.join(" ");

        return entryPoint;
    },

    renderArguments: (projectId: number, command: Command, commandArgs: CommandArgumentsMap) => {
        let commandArgsRendered = "";

        Object.keys(commandArgs).forEach((key) => {
            let containerArg = commandArgs[key];
            commandArgsRendered += ` -var ${containerArg.name}=${containerArg.placeholder}`;
        });

        return commandArgsRendered;
    },
};

const CommandService = {
    generateEntryPoint: (projectId: number, command: Command, usage: CommandUsage) => {
        return RmapCommandLineGenerator.generateEntryPoint(projectId, command, usage);
    },

    renderArguments: (projectId: number, command: Command, commandArgs: CommandArgumentsMap) => {
        return RmapCommandLineGenerator.renderArguments(projectId, command, commandArgs);
    },
};

export { HostCommandLineGenerator, RmapCommandLineGenerator };

export default CommandService;
