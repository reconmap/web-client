import { User } from "models/User.js";
import secureApiFetch from "services/api.js";

const API_PREFIX: string = "/users";

const createUserApi = (user: User): Promise<Response> => {
    return secureApiFetch(API_PREFIX, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const getUser = (userId: number): Promise<Response> => {
    return secureApiFetch(`${API_PREFIX}/${userId}`, {
        method: "GET",
    });
};

const getUsers = (): Promise<Response> => {
    return secureApiFetch(API_PREFIX, {
        method: "GET",
    });
};

const updateUser = (user: User): Promise<Response> => {
    return secureApiFetch(`${API_PREFIX}/${user.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const deleteUser = (userId: number): Promise<Response> => {
    return secureApiFetch(`${API_PREFIX}/${userId}`, {
        method: "DELETE",
    });
};

const deleteUsers = (userIds: number[]): Promise<Response> => {
    return secureApiFetch(API_PREFIX, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Bulk-Operation": "DELETE",
        },
        body: JSON.stringify(userIds),
    });
};

export { createUserApi, deleteUser, deleteUsers, getUser, getUsers, updateUser };
