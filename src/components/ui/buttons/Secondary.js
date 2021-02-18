import { useHistory } from 'react-router-dom'

const SecondaryButton = ({ onClick, children, to, disabled = false, external = false, tooltip }) => {
    const history = useHistory()
    const handleOpen = () => {
        external ? window.open(to, '_blank') : history.push(to)
    }

    return (
        <button
            title={tooltip} onClick={onClick || handleOpen} disabled={disabled}>
            {children}
        </button>
    )
}

export default SecondaryButton;
