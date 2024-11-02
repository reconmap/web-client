import { Link } from "react-router-dom";

const Tags = ({ values }) => {
    if (!values) return null;

    return JSON.parse(values).map((value, index) => (
        <span key={`tag_index_${index}`} size="sm">
            <Link to={`/search/${value}?entities=commands,vulnerabilities`}>{value}</Link>
        </span>
    ));
};

export default Tags;
