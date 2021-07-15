import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

const DeleteButton = (props) => <Button colorScheme="red" onClick={props.onClick} {...props} leftIcon={<DeleteIcon />}>
    {props.children || "Delete"}
</Button>

export default DeleteButton;
