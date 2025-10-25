import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestNotifications = async () => {
    return (await secureApiFetch("/notifications", { method: "GET" })).json();
};

const requestNotificationDelete = (notificationId: number) => {
    return secureApiFetch(`/notifications/${notificationId}`, {
        method: "DELETE",
    });
};

const useNotificationsQuery = () => {
    return useQuery({
        queryKey: ["system-notifications"],
        queryFn: requestNotifications,
    });
};

const useDeleteNotificationMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (notificationId: number) => requestNotificationDelete(notificationId).then((res) => res.json()),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["system-notifications"] });
        },
    });
};

export { useDeleteNotificationMutation, useNotificationsQuery };
