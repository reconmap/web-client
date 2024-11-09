import { Link } from "react-router-dom";
import Tag from "./Tag";

const Tags = ({ values }) => {
    if (!values) return null;

    return JSON.parse(values)
        .filter((value) => value.length > 0)
        .map((value, index) => (
            <Tag key={`tag_index_${index}`}>
                <Link to={`/search/${value}?entities=commands,vulnerabilities`}>{value}</Link>
            </Tag>
        ));
};

export default Tags;
