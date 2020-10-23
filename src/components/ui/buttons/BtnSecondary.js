import { useHistory } from 'react-router-dom'

export default function BtnSecondary({ onClick, children, color = 'silver', fontSize = 'fontSizeSmall', to, disabled = false, external = false }) {
    const history = useHistory()
    const handleOpen = () => {
        external ? window.open(to, '_blank') : history.push(to)
    }
    const styles = {
        button :{ 
            padding: 'var(--paddingBox)',
            display: 'inline-flex',
            alignItems: 'center',
            // backgroundColor : 'var(--gray)',
            color: `var(--${color},white)`,
            borderRadius: 'var(--borderRadius, 3px)',
            border: `var(--borderWidth,2px) solid var(--gray)`,
            fontSize : `var(--${fontSize})`,
            opacity : disabled ? '.5' : '1'
        }
    }
    
    return (
        <button style={ styles.button } onClick={onClick || handleOpen} disabled={disabled} >
            {children}
        </button>
    )
}
