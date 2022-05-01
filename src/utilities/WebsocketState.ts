
const convertReadyStateToText = (webSocketConnection: { readyState: number; }) => {
    const states = [
        'Connecting',
        'Open',
        'Closing',
        'Closed',
    ];
    return states[webSocketConnection.readyState];
}

export default convertReadyStateToText;
