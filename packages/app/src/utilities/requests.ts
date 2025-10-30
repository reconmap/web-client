import secureApiFetch from "services/api.js";

const requestEntity = (url: string) => {
    return secureApiFetch(url, { method: "GET" });
};

const requestEntities = (url: string, params?: Record<string, any>) => {
    const fullUrl = url + (params ? "?" + new URLSearchParams(params).toString() : "");
    return secureApiFetch(fullUrl, { method: "GET" });
};

const requestEntityPost = (url: string, data?: FormData | Record<string, any>) => {
    const params: Record<string, any> = {
        method: "POST",
    };
    if (data) {
        params.body = data instanceof FormData ? data : JSON.stringify(data);
    }
    return secureApiFetch(url, params);
};

const requestEntityPut = (url: string, data: any) => {
    return secureApiFetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
    });
};

const requestEntityPatch = (url: string, data: any) => {
    return secureApiFetch(url, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
};

const requestEntityDelete = (url: string) => {
    return secureApiFetch(url, {
        method: "DELETE",
    });
};

export { requestEntities, requestEntity, requestEntityDelete, requestEntityPatch, requestEntityPost, requestEntityPut };
