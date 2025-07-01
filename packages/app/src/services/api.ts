import Configuration from "Configuration.js";
import KeyCloakService from "./keycloak.js";

function resetSessionStorageAndRedirect() {
    window.location.assign(Configuration.getContextPath());
}

function buildApiRequest(url: string, init: Record<string, any> = {}): Request {
    const user = KeyCloakService.getUserInfo();

    const headers = user && user.access_token !== null ? { Authorization: "Bearer " + user.access_token } : {};
    const initWithAuth = init;
    if (Object.prototype.hasOwnProperty.call(initWithAuth, "headers")) {
        Object.assign(initWithAuth.headers, headers);
    } else {
        initWithAuth.headers = headers;
    }
    init.credentials = "include";

    return new Request(Configuration.getDefaultApiUrl() + url, init);
}

function secureApiFetch(url: string, init: Record<string, any> = {}): Promise<Response> {
    if ("undefined" === typeof init) {
        init = {};
    }
    const user = KeyCloakService.getUserInfo();

    const headers = user && user.access_token !== null ? { Authorization: "Bearer " + user.access_token } : {};
    const initWithAuth = init;
    if (Object.prototype.hasOwnProperty.call(initWithAuth, "headers")) {
        Object.assign(initWithAuth.headers, headers);
    } else {
        initWithAuth.headers = headers;
    }
    init.credentials = "include";

    return fetch(Configuration.getDefaultApiUrl() + url, init)
        .then((resp) => {
            if (resp.status === 401) {
                resetSessionStorageAndRedirect();
            }

            return resp;
        })
        .catch((err) => {
            if (err.message.toLowerCase().indexOf("network") !== -1) {
                console.error(err.message);
                //errorToast("Network error. Please check connectivity with the API.");
            }
            return Promise.reject(err);
        });
}

const downloadFromApi = (url: string) => {
    secureApiFetch(url, { method: "GET" })
        .then((resp) => {
            const contentDispositionHeader = resp.headers.get("Content-Disposition");
            if (!contentDispositionHeader) {
                throw new Error("Content-Disposition header not found in response.");
            }
            const filenameRe = new RegExp(/filename="(.*)";/);
            const match = filenameRe.exec(contentDispositionHeader);
            if (!match || !match[1]) {
                throw new Error("Filename not found in Content-Disposition header.");
            }
            const filename = match[1];
            return Promise.all([resp.blob(), filename]);
        })
        .then((values) => {
            const blob = values[0];
            const filename = values[1];
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
        });
};

export { buildApiRequest, downloadFromApi };

export default secureApiFetch;
