import parseArguments from "./commands/arguments";

const HostCommandLineGenerator = {
    generateEntryPoint: (command) => {
        return command.executable_path;
    },

    renderArguments: (command, commandArgs = null) => {
        if (commandArgs === null) {
            commandArgs = parseArguments(command);
        }

        let commandArgsRendered = ''

        commandArgsRendered = command.arguments;
        Object.keys(commandArgs).forEach((key) => {
            let containerArg = commandArgs[key];
            commandArgsRendered = commandArgsRendered.replace(new RegExp(`{{{${containerArg.name}\\|\\|\\|.*?}}}`), containerArg.placeholder);
        });

        return commandArgsRendered;
    }
};

const RmapCommandLineGenerator = {
    generateEntryPoint: (command, task = null) => {
        let entryPoint = `rmap command run -cid ${command.id}`;
        if (task !== null) {
            entryPoint += ' -tid ' + task.id;
        }
        return entryPoint;
    },

    renderArguments: (command, commandArgs = null) => {
        if (commandArgs === null) {
            commandArgs = parseArguments(command);
        }

        let commandArgsRendered = ''

        Object.keys(commandArgs).forEach((key) => {
            let containerArg = commandArgs[key];
            commandArgsRendered += ` -var ${containerArg.name}=${containerArg.placeholder}`;
        });

        return commandArgsRendered;
    }
};

const CommandService = {
    hasCommand: command => {
        return (command !== null && command !== undefined && command.executable_path !== null && command.executable_path.length > 0);
    },

    generateEntryPoint: (command, task = null) => {
        return RmapCommandLineGenerator.generateEntryPoint(command, task);
    },

    renderArguments: (command, commandArgs = null) => {
        return RmapCommandLineGenerator.renderArguments(command, commandArgs);
    }
};

export { HostCommandLineGenerator, RmapCommandLineGenerator };

export default CommandService;
