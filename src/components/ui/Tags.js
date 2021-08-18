import { Tag } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Tags = ({ values }) => {
    if (!values) return null;

    return JSON.parse(values)
        .map(value => <Tag size="sm"><Link to={`/search/${value}?entities=commands,vulnerabilities`}>{value}</Link></Tag>);
}

export default Tags;
