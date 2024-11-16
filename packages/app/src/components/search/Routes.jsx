import { Route } from "react-router-dom";
import AdvancedSearch from "./AdvancedSearch";
import SearchResults from "./Results";
import SearchUrls from "./SearchUrls";

const SearchRoutes = [
    <Route path={SearchUrls.KeywordsSearch} element={<SearchResults />} />,
    <Route path={SearchUrls.AdvancedSearch} element={<AdvancedSearch />} />,
];

export default SearchRoutes;
