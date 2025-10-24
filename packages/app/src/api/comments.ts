import { useQuery } from "@tanstack/react-query";
import secureApiFetch from "services/api.js";

const requestComments = (params: any) => {
    return secureApiFetch("/notes?" + new URLSearchParams(params).toString(), { method: "GET" });
};

const useNotesQuery = (params: any) => {
    return useQuery({
        queryKey: ["notes"],
        queryFn: () => requestComments(params).then((res) => res.json()),
    });
};

export { useNotesQuery };
