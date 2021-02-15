
const CommandService = {
    generateEntryPoint: command => {
        if ('rmap' === command.executable_type) {
            return `./rmap run-command -id ${command.id}`;
        } else {
            return command.executable_path;
        }
    },

    parseArguments: command => {
        const argRegex = /{{{(.+?)}}}/g;
        const commandArgsFound = command.arguments.match(argRegex);
        if (commandArgsFound) {
            const commandArgsParsed = commandArgsFound.reduce((accumulator, current) => {
                const tokens = current.replaceAll('{{{', '').replaceAll('}}}', '').split('|||');
                accumulator[tokens[0]] = {
                    name: tokens[0],
                    placeholder: tokens[1]
                };
                return accumulator;
            }, {});
            return commandArgsParsed;
        } else {
            return {};
        }
    },

    renderArguments: (command, commandArgs = null) => {
        if (commandArgs === null) {
            commandArgs = CommandService.parseArguments(command);
        }
        const usesContainer = command.executable_type === 'rmap';

        let commandArgsRendered

        if (usesContainer) {
            commandArgsRendered = '';
            Object.keys(commandArgs).forEach((key) => {
                let containerArg = commandArgs[key];
                commandArgsRendered += ` -var ${containerArg.name}=${containerArg.placeholder}`;
            });
        } else {
            commandArgsRendered = command.arguments;
            Object.keys(commandArgs).forEach((key) => {
                let containerArg = commandArgs[key];
                commandArgsRendered = commandArgsRendered.replace(new RegExp(`{{{${containerArg.name}\\|\\|\\|.*?}}}`), containerArg.placeholder);
            });
        }

        return commandArgsRendered;
    }
};

export default CommandService;
