type WidgetConfig = {
    [key: string]: {
        visible: boolean;
    };
};

const widgetIsVisible = (widgetConfig: WidgetConfig | null, widgetId: string): boolean => {
    if (widgetConfig === null) {
        return true;
    }
    return widgetConfig.hasOwnProperty(widgetId) ? widgetConfig[widgetId].visible : true;
};

export default widgetIsVisible;
