import { Link } from "@chakra-ui/react";
import PropTypes from "prop-types";

const SortLink = ({ callback, property, direction = "asc" }) => (
    <Link onClick={(ev) => callback(ev, property, direction)}>{direction === "desc" ? <>&darr;</> : <>&uarr;</>}</Link>
);

SortLink.propTypes = {
    callback: PropTypes.func.isRequired,
    property: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
};

export default SortLink;
