
const parseArguments = command => {
    const argumentList = {};

    if (null === command || null === command.arguments) {
        return argumentList;
    }

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
        }, argumentList);
        return commandArgsParsed;
    }

    return argumentList;
}

export default parseArguments;
