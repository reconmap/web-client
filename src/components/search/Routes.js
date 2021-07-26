import ProtectedRoute from "../logic/ProtectedRoute";
import AdvancedSearch from "./AdvancedSearch";
import SearchResults from "./Results";

const SearchRoutes = [
    <ProtectedRoute path={`/search/:keywords`} component={SearchResults} />,
    <ProtectedRoute path={`/advanced-search`} component={AdvancedSearch} />,
]

export default SearchRoutes;
