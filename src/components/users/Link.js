import React from 'react';
import PropTypes from 'prop-types';

const UserLink = ({userId, children}) => {
    return <a href={`/users/${userId}`}>{children}</a>
}

UserLink.propTypes = {
    userId: PropTypes.number.isRequired
};

export default UserLink