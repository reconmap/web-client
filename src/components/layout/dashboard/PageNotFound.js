import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';

const PageNotFound = () => {
    return <Alert
        status='error'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
    >
        <AlertIcon boxSize='40px' mr={0} />
        <AlertTitle mt={4} mb={1} fontSize='lg'>
            Page not found
        </AlertTitle>
        <AlertDescription>
            There is nothing at this address. Please navigate to another place.
        </AlertDescription>
    </Alert>
}

export default PageNotFound;
