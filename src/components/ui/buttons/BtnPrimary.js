import {useHistory} from 'react-router-dom';

export default function BtnPrimary({type, onClick, children, color = 'red', fontSize = 'fontSizeSmall', disabled = false, to, external = false}) {
   
    const history = useHistory()
    const handleOpen = () => {
        external ? window.open(to, '_blank') : history.push(to)
    }
    const styles = {
        button :{ 
            padding: 'var(--paddingBox)',
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor : `var(--${color})`,
            color: `var(--text-color)`,
            borderRadius: 'var(--borderRadius, 3px)',
            border: `var(--borderWidth,2px) solid transparent`,
            fontSize : `var(--${fontSize})`,
            opacity : disabled ? '.5' : '1'
        }
    }

    return (
        <button
            type={type ? type : "button"}
            onClick={onClick || handleOpen}
            disabled={disabled}
            style={styles.button}
            >
            {children}
        </button>
    )
}
