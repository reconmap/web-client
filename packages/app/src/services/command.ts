import { Command } from "models/Command.js";
import { CommandUsage } from "models/CommandUsage.js";
import parseArguments from "./commands/arguments";

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

    renderArguments: (projectId: number, command: Command, commandArgs = null) => {
        if (commandArgs === null) {
            commandArgs = parseArguments(command);
        }

        let commandArgsRendered = "";

        Object.keys(commandArgs).forEach((key) => {
            let containerArg = commandArgs[key];
            commandArgsRendered += ` -var ${containerArg.name}=${containerArg.placeholder}`;
        });

        return commandArgsRendered;
    },
};

const CommandService = {
    generateEntryPoint: (projectId: number, command: Command, usage: CommandUsage, task = null) => {
        return RmapCommandLineGenerator.generateEntryPoint(projectId, command, usage, task);
    },

    renderArguments: (projectId: number, command: Command, commandArgs = null) => {
        return RmapCommandLineGenerator.renderArguments(projectId, command, commandArgs);
    },
};

export { HostCommandLineGenerator, RmapCommandLineGenerator };

export default CommandService;
