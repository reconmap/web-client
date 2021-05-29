import { createStandaloneToast } from "@chakra-ui/react"

export const toast = createStandaloneToast()

export function actionCompletedToast(msg) {
    toast({ title:'Action Completed', description: msg})
}
