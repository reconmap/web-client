
const Configuration = {

    isSecureTransportEnabled: () => window.env.REACT_APP_SECURE_TRANSPORT_ENABLED,

    getDefaultApiUrl: () => window.env.REACT_APP_DEFAULT_API_URL,

    getNotificationsServiceHostPort: () => window.env.REACT_APP_NOTIFICATIONS_SERVICE_HOST_PORT,

    getAgentServiceHostPort: () => window.env.REACT_APP_AGENT_SERVICE_HOST_PORT,

    getContextPath: () => window.env.REACT_APP_CONTEXT_PATH || '/',

    getLogoUrl: () => window.env.REACT_APP_LOGO_URL || '/logo-name.png'
};

export default Configuration;
