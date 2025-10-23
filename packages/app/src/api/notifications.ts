import { useQuery } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestNotifications = () => {
    return secureApiFetch("/notifications", { method: "GET" });
};

const useNotificationsQuery = () => {
    return useQuery({
        queryKey: ["system-notifications"],
        queryFn: () => requestNotifications().then((res) => res.json()),
    });
};

export { useNotificationsQuery };
