
const widgetIsVisible = (widgetId) => {
    const widgetConfigEncoded = localStorage.getItem('widget-config');
    if (widgetConfigEncoded === undefined || widgetConfigEncoded === null) {
        return true;
    }

    const widgetConfig = JSON.parse(widgetConfigEncoded);
    return widgetConfig.hasOwnProperty(widgetId) ? widgetConfig[widgetId].visible : true;
}

export default widgetIsVisible;
