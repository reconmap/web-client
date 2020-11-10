import './styles/main.scss'

import * as serviceWorker from './serviceWorker';

import App from './App';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';


ReactDOM.render(<BrowserRouter> <App/> </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
