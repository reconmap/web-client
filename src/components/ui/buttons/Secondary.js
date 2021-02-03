import { useHistory } from 'react-router-dom'

const SecondaryButton = ({ onClick, children, to, disabled = false, external = false, tooltip }) => {
    const history = useHistory()
    const handleOpen = () => {
        external ? window.open(to, '_blank') : history.push(to)
    }
    const styles = {
        button: { opacity: disabled ? '.5' : '1' }
    }

    return (
        <button
            title={tooltip}
            style={styles.button} onClick={onClick || handleOpen} disabled={disabled}>
            {children}
        </button>
    )
}

export default SecondaryButton;
