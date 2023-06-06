import { IconButton } from "@chakra-ui/react";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DeleteIconButton = (props) => <IconButton colorScheme="red" onClick={props.onClick} {...props} icon={<FontAwesomeIcon icon={faTrashCan} />} />

export default DeleteIconButton;
