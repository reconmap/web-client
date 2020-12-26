import Configuration from '../Configuration';
import toast from "../components/ui/toast";

function resetSessionStorageAndRedirect() {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('isAuth');
    window.localStorage.removeItem('user.id');
    window.localStorage.removeItem('user');
    window.location = '/';
}

function secureApiFetch(url, init) {
    const accessToken = localStorage.getItem('accessToken');
    const headers = accessToken !== null ? {Authorization: 'Bearer ' + accessToken} : {};
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
