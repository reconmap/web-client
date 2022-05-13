import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export function actionCompletedToast(description) {
    toast({
        title: 'Action completed',
        description: description,
        position: 'bottom-right',
        isClosable: true,
        status: 'success'
    });
}

export function errorToast(description) {
    toast({
        title: 'An error has occurred',
        description: description,
        position: 'bottom-right',
        isClosable: false,
        status: 'error'
    });
}
