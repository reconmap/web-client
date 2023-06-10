import { Spinner } from '@chakra-ui/react'

export default function Loading() {
    return <figure className='message__container'>
        <Spinner />
        Loading...
    </figure>
}
