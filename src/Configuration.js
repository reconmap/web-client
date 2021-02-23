const Configuration = {
    apiEndpoint: window.env.REACT_APP_API_ENDPOINT,
    wsEndpoint: window.env.REACT_APP_WS_ENDPOINT,
    appBasename: window.env.REACT_APP_BASENAME || '/',
};

export default Configuration;
