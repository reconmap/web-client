import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const VisibilityLegend = ({ visibility }) => {
    return <>{visibility === 'public' ? <><FontAwesomeIcon icon={faEye} /> Public</> : <><FontAwesomeIcon icon={faEyeSlash} /> Private</>}</>
}

VisibilityLegend.propTypes = {
    visibility: PropTypes.string.isRequired
}

export default VisibilityLegend;
