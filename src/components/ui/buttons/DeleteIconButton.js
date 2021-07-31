import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

const DeleteIconButton = (props) => <IconButton colorScheme="red" onClick={props.onClick} {...props} leftIcon={<DeleteIcon />} />

export default DeleteIconButton;
