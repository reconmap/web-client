import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestTasksForUser = (userId: number) => {
    return secureApiFetch(`/tasks?assigneeUid=${userId}&limit=5&projectIsArchived=0`, { method: "GET" });
};

const requestTask = (taskId: number) => {
    return secureApiFetch(`/tasks/${taskId}`, { method: "GET" });
};

const requestTaskDelete = (taskId: number) => {
    return secureApiFetch(`/tasks/${taskId}`, {
        method: "DELETE",
    });
};

const useQueryTasksForUser = (userId: number) => {
    return useQuery({
        queryKey: ["tasks", userId],
        queryFn: () => requestTasksForUser(userId).then((res) => res.json()),
    });
};

const useTaskQuery = (taskId: number) => {
    return useQuery({
        queryKey: ["tasks", taskId],
        queryFn: () => requestTask(taskId).then((res) => res.json()),
    });
};

const useDeleteTaskMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (taskId: number) => requestTaskDelete(taskId).then((res) => res.json()),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
};

export { useDeleteTaskMutation, useQueryTasksForUser, useTaskQuery };
