import { CommandInterface } from "models/Command.js";
import { CommandUsageInterface } from "models/CommandUsage.js";
import parseArguments, { CommandArgumentsMap } from "./commands/arguments.js";

const HostCommandLineGenerator = {
    generateEntryPoint: (projectId: number, command: CommandInterface, usage: CommandUsageInterface) => {
        return usage.executablePath;
    },

    renderArguments: (projectId: number, command: CommandUsageInterface, commandArgs: any = null) => {
        if (commandArgs === null) {
            commandArgs = parseArguments(command);
        }

        let commandArgsRendered = "";

        commandArgsRendered = command.arguments ?? "";
        Object.keys(commandArgs).forEach((key) => {
            const containerArg = commandArgs[key];
            commandArgsRendered = commandArgsRendered.replace(
                new RegExp(`{{{${containerArg.name}\\|\\|\\|.*?}}}`),
                containerArg.placeholder,
            );
        });

        return commandArgsRendered;
    },
};

const RmapCommandLineGenerator = {
    generateEntryPoint: (projectId: number, command: CommandInterface, usage: CommandUsageInterface) => {
        const commandParts = ["rmap", "command run"];
        if (projectId !== null) {
            commandParts.push(`-pid ${projectId}`);
        }
        commandParts.push(`-cuid ${usage.id}`);
        const entryPoint = commandParts.join(" ");

        return entryPoint;
    },

    renderArguments: (projectId: number, command: CommandInterface, commandArgs: CommandArgumentsMap) => {
        let commandArgsRendered = "";

        Object.keys(commandArgs).forEach((key) => {
            const containerArg = commandArgs[key];
            commandArgsRendered += ` -var ${containerArg.name}=${containerArg.placeholder}`;
        });

        return commandArgsRendered;
    },
};

const CommandService = {
    generateEntryPoint: (projectId: number, command: CommandInterface, usage: CommandUsageInterface) => {
        return RmapCommandLineGenerator.generateEntryPoint(projectId, command, usage);
    },

    renderArguments: (projectId: number, command: CommandInterface, commandArgs: CommandArgumentsMap) => {
        return RmapCommandLineGenerator.renderArguments(projectId, command, commandArgs);
    },
};

export { HostCommandLineGenerator, RmapCommandLineGenerator };

export default CommandService;
