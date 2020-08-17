import './styles/main.scss'

import * as serviceWorker from './serviceWorker';

import App from './landing/App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';


ReactDOM.render( <BrowserRouter> <App /> </BrowserRouter>, document.getElementById('root') );

const replaceIcons = async () => {
    await window.feather;
    window.feather.replace();
}
replaceIcons()

serviceWorker.unregister();
