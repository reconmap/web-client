// import toast from "../components/ui/toast";
import { toast } from 'components/ui/toast';
import Configuration from '../Configuration';
import Auth from "./auth";

function resetSessionStorageAndRedirect() {
    Auth.removeSession();
    window.location = '/';
}

function secureApiFetch(url, init) {
    const user = JSON.parse(localStorage.getItem('user'));

    const headers = user && user.access_token !== null ? { Authorization: 'Bearer ' + user.access_token } : {};
    const initWithAuth = init;
    if (initWithAuth.hasOwnProperty('headers')) {
        Object.assign(initWithAuth.headers, headers);
    } else {
        initWithAuth.headers = headers;
    }

    return fetch(Configuration.apiEndpoint + url, init)
        .then(resp => {
            if (resp.status === 401) {
                resetSessionStorageAndRedirect();
            }

            return resp;
        })
        .catch(err => {
            if (err.message.toLowerCase().indexOf('network') !== -1) {
                console.error(err.message);
                toast('Network error', 'Please check connectivity with the API.');
            }
            return Promise.reject(err);
        });
}

export default secureApiFetch
