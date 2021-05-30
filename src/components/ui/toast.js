import { createStandaloneToast } from "@chakra-ui/react"

export const toast = createStandaloneToast()

export function actionCompletedToast(description) {
    toast({
        title: 'Action completed',
        description: description,
        position: 'bottom-right',
        isClosable: true,
        status: 'success'
    })
}
