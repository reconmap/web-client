import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {IconUser} from '../ui/Icons';

const UserLink = ({userId, children}) => {
    const styles = {
        badge: {
            alignItems: 'center',
            display: `inline-flex`,
            borderRadius: 'var(--borderRadius)',
            fontWeight: 'var(--fontBold)',
            fontSize: 'var(--fontSizeSmall)',
            backgroundColor: 'var(--black)',
            padding: 'calc(var(--padding)/2) var(--margin)',
        }
    }
    return <Link
        style={styles.badge}
        to={`/users/${userId}`}>
        <IconUser styling={{color: 'var(--text-color)'}}/>
        {children}
    </Link>
}

UserLink.propTypes = {
    userId: PropTypes.number.isRequired
};

export default UserLink