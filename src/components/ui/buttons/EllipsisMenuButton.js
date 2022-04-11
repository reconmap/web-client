import { IconButton, MenuButton } from "@chakra-ui/react";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EllipsisMenuButton = () => <MenuButton as={IconButton} aria-label="Options" icon={<FontAwesomeIcon icon={faEllipsis} />} variant="outline" />;

export default EllipsisMenuButton;
