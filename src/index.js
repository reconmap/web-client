import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './styles/main.scss';

TimeAgo.addDefaultLocale(en);

ReactDOM.render(<BrowserRouter> <App /> </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
