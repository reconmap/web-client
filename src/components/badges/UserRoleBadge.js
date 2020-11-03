export default function UserRoleBadge({role}) {

    const roles = {
        'creator': 'red',
        'writer': 'blue',
        'reader': 'green',
    }

    const color = roles.hasOwnProperty(role) ? roles[role] : 'yellow';

    const styles = {
        color: `var(--${color},white)`,
        backgroundColor: `var(--${color}Dark)`,
        padding: `var(--paddingBox, .3rem .8rem)`,
        borderRadius: 'var(--borderRadius, 3px)',
        border: `var(--borderWidth,2px) solid transparent`,
        fontSize: `var(--fontSizeXsmall)`,
        fontWeight: 'var(--fontBold)',
    }

    return <span style={styles}>{role}</span>
}
