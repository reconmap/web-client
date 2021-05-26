import { useLocation } from "react-router";

const useQuery = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
}

export default useQuery;
