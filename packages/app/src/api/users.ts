import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserInterface } from "models/User.js";
import secureApiFetch from "services/api.js";

const API_PREFIX: string = "/users";

const createUserApi = (user: UserInterface): Promise<Response> => {
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

const requestUserActivity = (userId: number): Promise<Response> => {
    return secureApiFetch(`${API_PREFIX}/${userId}/activity`, {
        method: "GET",
    });
};

const getUsers = (): Promise<Response> => {
    return secureApiFetch(API_PREFIX, {
        method: "GET",
    });
};

const updateUser = (user: UserInterface): Promise<Response> => {
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

const requestUserAction = (userId: number, action: string): Promise<Response> => {
    return secureApiFetch(`${API_PREFIX}/${userId}/actions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: action }),
    });
};

const enableMfaApi = (userId: number): Promise<Response> => {
    return requestUserAction(userId, "enable-mfa");
};

const resetPassword = (userId: number): Promise<Response> => {
    return requestUserAction(userId, "reset-password");
};

const useUserQuery = (userId: number) => {
    return useQuery({
        queryKey: ["users", userId],
        queryFn: () => getUser(userId).then((res) => res.json()),
    });
};

const useUserActivity = (userId: number) => {
    return useQuery({
        queryKey: ["users", userId],
        queryFn: () => requestUserActivity(userId).then((res) => res.json()),
    });
};

const useUsersQuery = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers().then((res) => res.json()),
    });
};

const useUserDeleteMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId: number) => deleteUser(userId).then((res) => res.json()),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

export {
    createUserApi,
    deleteUser,
    deleteUsers,
    enableMfaApi,
    getUser,
    getUsers,
    resetPassword,
    updateUser,
    useUserActivity,
    useUserDeleteMutation,
    useUserQuery,
    useUsersQuery,
};
