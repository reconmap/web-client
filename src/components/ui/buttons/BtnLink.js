import { useHistory } from 'react-router-dom'

export default function BtnLink ({ onClick, children, color = 'red', fontSize = 'fontSizeSmall', to, disabled = false, external = false }) {
    const history = useHistory()
    const handleOpen = () => {
        external ? window.open(to, '_blank') : history.push(to)
    }
    const styles = {
        button :{ 
            padding: 'var(--paddingBox)',
            display: 'inline-flex',
            alignItems: 'center',
            borderBottomColor : `var(--${color})`,
            color: `var(--text-color)`,
            borderBottom: `var(--borderWidth,2px) solid transparent`,
            fontSize : `var(--${fontSize})`,
            opacity : disabled ? '.5' : '1'
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
