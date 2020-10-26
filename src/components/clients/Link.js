import { Link } from "react-router-dom"
import { IconUser } from "../icons"

export const ClientLink = ({clientId, children}) => {
    const styles = {
        badge : {
            alignItems:'center',
            display: `inline-flex`,
            borderRadius: 'var(--borderRadius)',
            fontWeight : 'var(--fontBold)',
            fontSize: 'var(--fontSizeSmall)',
            backgroundColor : 'var(--black)',
            padding : 'calc(var(--padding)/2) var(--margin)' ,
        }
    }


    return <Link 
                style={styles.badge} 
                to={`/clients/${clientId}`}>
                <IconUser styling={{ color:'var(--text-color)' }}/>
                {children}
            </Link>
}
