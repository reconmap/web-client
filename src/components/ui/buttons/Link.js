import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './Link.css';

const LinkButton = ({ children, external = false, ...props }) => {
    const navigate = useNavigate();

    const onAnchorClick = ev => {
        ev.stopPropagation();

        if (!external) {
            ev.preventDefault();

            navigate({
                pathname: ev.target.pathname,
                search: ev.target.search
            });
        }
    }

    return (
        <a onClick={onAnchorClick} target={external ? "_blank" : ""} className="link-button" {...props}>
            {children}
        </a>
    )
}

LinkButton.propTypes = {
    href: PropTypes.string.isRequired
};

export default LinkButton;
