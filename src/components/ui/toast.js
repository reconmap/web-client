import { createStandaloneToast } from "@chakra-ui/react"

export const toast = createStandaloneToast()

export function actionCompletedToast(msg) {
    toast({ 
        title:'Action completed', 
        description: msg, 
        position:"bottom-right",
        isClosable: true,
        status:'error'
    })
}
