import { Route } from "react-router-dom";
import AdvancedSearch from "./AdvancedSearch";
import SearchResults from "./Results";

const SearchRoutes = [
    <Route path={`/search/:keywords`} element={<SearchResults />} />,
    <Route path={`/advanced-search`} element={<AdvancedSearch />} />,
]

export default SearchRoutes;
