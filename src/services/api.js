import configuration from '../Configuration';

function secureApiFetch(input, init) {
    const headers = {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
    }
    var initWithAuth = init;
    if (initWithAuth.hasOwnProperty('headers')) {
        Object.assign(initWithAuth.headers, headers);
    } else {
        initWithAuth.headers = headers;
    }
    return fetch(configuration.api.baseUrl + input, init);
}

export default secureApiFetch
