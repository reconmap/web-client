import { useQuery } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestTasksForUser = (userId: number) => {
    return secureApiFetch(`/tasks?assigneeUid=${userId}&limit=5&projectIsArchived=0`, { method: "GET" });
};

const useQueryTasksForUser = (userId: number) => {
    return useQuery({
        queryKey: ["tasks", userId],
        queryFn: () => requestTasksForUser(userId).then((res) => res.json()),
    });
};

export { useQueryTasksForUser };
