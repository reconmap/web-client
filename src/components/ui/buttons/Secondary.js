import { Button } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

const SecondaryButton = ({ onClick, children, to, disabled = false, external = false, tooltip }) => {
    const history = useHistory()
    const handleOpen = () => {
        external ? window.open(to, '_blank') : history.push(to)
    }

    return (
        <Button
            title={tooltip} onClick={onClick || handleOpen} disabled={disabled}>
            {children}
        </Button>
    )
}

export default SecondaryButton;
