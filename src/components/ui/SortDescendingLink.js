import { Link } from "@chakra-ui/layout";

const SortDescendingLink = ({ sortCallback }) => <Link onClick={sortCallback}>&darr;</Link>

export default SortDescendingLink;
