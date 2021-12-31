
const widgetIsVisible = (widgetConfig, widgetId) => {
    if (null === widgetConfig) { return true; }
    return widgetConfig.hasOwnProperty(widgetId) ? widgetConfig[widgetId].visible : true;
}

export default widgetIsVisible;
