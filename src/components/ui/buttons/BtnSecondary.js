import {useHistory} from 'react-router-dom'

export default function BtnSecondary({onClick, children, to, disabled = false, external = false}) {
    const history = useHistory()
    const handleOpen = () => {
        external ? window.open(to, '_blank') : history.push(to)
    }
    const styles = {
        button: {opacity: disabled ? '.5' : '1'}
    }

    return (
        <button style={styles.button} onClick={onClick || handleOpen} disabled={disabled}>
            {children}
        </button>
    )
}
