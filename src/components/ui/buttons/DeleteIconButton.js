import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

const DeleteIconButton = (props) => <IconButton colorScheme="red" onClick={props.onClick} {...props} icon={<DeleteIcon />} />

export default DeleteIconButton;
