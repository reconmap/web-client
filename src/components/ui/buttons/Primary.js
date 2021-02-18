import { useHistory } from 'react-router-dom';

const PrimaryButton = ({
    type,
    onClick,
    children,
    color = 'primary-color',
    fontSize = 'fontSizeSmall',
    disabled = false,
    to,
    external = false
}) => {

    const history = useHistory()
    const handleOpen = () => {
        external ? window.open(to, '_blank') : history.push(to)
    }
    const styles = {
        button: {
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: `var(--${color})`,
            color: `var(--white)`,
            fontSize: `var(--${fontSize})`
        }
    }

    return (
        <button type={type ? type : "button"} onClick={onClick || handleOpen} disabled={disabled} style={styles.button}>
            {children}
        </button>
    )
}

export default PrimaryButton;
