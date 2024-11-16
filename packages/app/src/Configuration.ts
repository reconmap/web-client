import { KeycloakConfig } from "keycloak-js";

const Configuration = {
    isSecureTransportEnabled: (): string => window.env.VITE_SECURE_TRANSPORT_ENABLED,

    getDefaultApiUrl: (): string => window.env.VITE_DEFAULT_API_URL,

    getNotificationsServiceHostPort: (): string => window.env.VITE_NOTIFICATIONS_SERVICE_HOST_PORT,

    getAgentServiceHostPort: (): number => window.env.VITE_AGENT_SERVICE_HOST_PORT,

    getContextPath: (): string => window.env.VITE_CONTEXT_PATH || "/",

    getLogoUrl: (): string => window.env.VITE_LOGO_URL || "/logo-name.png",

    getKeycloakConfig: (): KeycloakConfig =>
        window.env.VITE_KEYCLOAK_CONFIG || {
            url: "http://localhost:8080",
            realm: "reconmap",
            clientId: "web-client",
        },
};

export default Configuration;
