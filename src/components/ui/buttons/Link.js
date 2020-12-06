import {useHistory} from 'react-router-dom'

export default function LinkButton({
                                       onClick,
                                       children,
                                       color = 'black',
                                       fontSize = 'fontSizeSmall',
                                       to,
                                       disabled = false,
                                       external = false
                                   }) {
    const history = useHistory()
    const handleOpen = () => {
        external ? window.open(to, '_blank') : history.push(to)
    }
    const styles = {
        button: {
            padding: 'var(--paddingBox)',
            display: 'inline-flex',
            alignItems: 'center',
            color: `var(--white)`,
            fontSize: `var(--${fontSize})`,
            opacity: disabled ? '.5' : '1',
            border: `var(--borderWidth) solid var(--${color})`,
            backgroundColor: 'transparent',
        }
    }

    return (
        <button
            onClick={onClick || handleOpen}
            disabled={disabled}
            style={styles.button}
        >
            {children}
        </button>
    )
}
