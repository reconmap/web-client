const UserRoleBadge = ({ role }) => {

    const roles = {
        'administrator': 'red',
        'superuser': 'blue',
        'user': 'green',
        'client': 'yellow',
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

export default UserRoleBadge;
