import './styles/main.scss'

import * as serviceWorker from './serviceWorker';

import App from './landing';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render( <BrowserRouter> <App /> </BrowserRouter>, document.getElementById('root') );

serviceWorker.unregister();
