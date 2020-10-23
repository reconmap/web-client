import {IconBookOpen, IconStar} from '../icons';

export default function UserRoleBadge({role}) {
    const ROLES = {
        'creator': {color: 'red', icon: <IconStar/>},
        'writer': {color: 'blue', icon: <IconStar/>},
        'reader': {color: 'green', icon: <IconBookOpen/>},
    }
    const styles = {
        badge : {
            color: `var(--${ROLES[role].color},white)`,
            backgroundColor : `var(--${ROLES[role].color}Dark)`,
            padding: `var(--paddingBox, .3rem .8rem)`,
            borderRadius: 'var(--borderRadius, 3px)',
            border: `var(--borderWidth,2px) solid transparent`,
            fontSize : `var(--fontSizeXsmall)`,
            fontWeight : 'var(--fontBold)',

        }
    }

    return <span style={ styles.badge}>
                {role}
            </span>
           
}
