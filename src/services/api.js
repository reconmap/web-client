import configuration from '../Configuration';

function secureApiFetch(input, init) {
    const accessToken = localStorage.getItem('accessToken');
    const headers = accessToken !== null ? {Authorization: 'Bearer ' + accessToken} : {};
    const initWithAuth = init;
    if (initWithAuth.hasOwnProperty('headers')) {
        Object.assign(initWithAuth.headers, headers);
    } else {
        initWithAuth.headers = headers;
    }

    return fetch(configuration.api.baseUrl + input, init)
        .then((response) => {
            if (response.status === 401) {
                window.localStorage.removeItem('accessToken');
                window.localStorage.removeItem('isAuth');
                window.localStorage.removeItem('user.id');
                window.localStorage.removeItem('user');
                window.location = '/';
            }

            return response;
        });
}

export default secureApiFetch
