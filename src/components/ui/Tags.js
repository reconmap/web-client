import { Tag } from "@chakra-ui/react";

const Tags = ({ values }) => {
    if (!values) return null;

    return JSON.parse(values)
        .map(value => <Tag size="sm">{value}</Tag>);
}

export default Tags;
