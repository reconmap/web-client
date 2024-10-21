import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import 'bootstrap/i18n';
import HeaderLogo from 'components/layout/HeaderLogo.jsx';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Link } from 'react-router-dom';
import KeyCloakService from 'services/keycloak.js';
import ReconmapTheme from 'theme/index.js';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker.js';
import './styles/main.scss';

TimeAgo.addDefaultLocale(en);

const { ToastContainer } = createStandaloneToast();

const rootContainer = document.getElementById('root');
const appRoot = ReactDOM.createRoot(rootContainer as Element);

appRoot.render(<BrowserRouter><div>
    <Link to='/' className="logo">
        <HeaderLogo />
        <h3>Authenticating...</h3>
    </Link>
</div></BrowserRouter>)

const onAuthSuccess = () => {
    appRoot.render(<React.StrictMode>
        <ChakraProvider theme={ReconmapTheme}>
            <App />
            <ToastContainer />
        </ChakraProvider>
    </React.StrictMode>);
}

const onAuthFailure = (message: string) => {
    appRoot.render(<BrowserRouter><div>
        <Link to='/' className="logo">
            <HeaderLogo />
            <h3>Authentication error: {message}</h3>
        </Link>
    </div></BrowserRouter>)
}

KeyCloakService.CallLogin(onAuthSuccess, onAuthFailure);

serviceWorker.unregister();
