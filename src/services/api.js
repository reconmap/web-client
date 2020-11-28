import Configuration from '../Configuration';

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
        .then((response) => {
            if (response.status === 401) {
                resetSessionStorageAndRedirect();
            }

            return response;
        })
        .catch(err => {
            if (err.message.toLowerCase().indexOf('network') !== -1) {
                resetSessionStorageAndRedirect();
            }
            return Promise.reject(err);
        });
}

export default secureApiFetch
