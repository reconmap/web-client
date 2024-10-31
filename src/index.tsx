import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import 'bootstrap/i18n';
import HeaderLogo from 'components/layout/HeaderLogo.jsx';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import React from 'react';
import ReactDOM from 'react-dom/client';
import KeyCloakService from 'services/keycloak.js';
import ReconmapTheme from 'theme/index.js';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker.js';
import './styles/main.css';

const rootContainer = document.getElementById('root');
const appRoot = ReactDOM.createRoot(rootContainer as Element);

appRoot.render(
<div>
    <a href="/" className="logo">
        <HeaderLogo />
        <h3>Authenticating...</h3>
    </a>
</div>
)

const onAuthSuccess = () => {
    TimeAgo.addDefaultLocale(en);

    const { ToastContainer } = createStandaloneToast();

    appRoot.render(<React.StrictMode>
        <ChakraProvider theme={ReconmapTheme}>
            <App />
            <ToastContainer />
        </ChakraProvider>
    </React.StrictMode>);
}

const onAuthFailure = (message: string) => {
    appRoot.render(
    <div>
        <a href="/" className="logo">
            <HeaderLogo />
            <h3>Authentication error: {message}</h3>
        </a>
    </div>
    )
}

KeyCloakService.login(onAuthSuccess, onAuthFailure);

serviceWorker.unregister();
