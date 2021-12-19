import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import PropTypes from 'prop-types';

export default function VisibilityLegend({ visibility }) {
    return <>{visibility === 'public' ? <><ViewIcon /> Public</> : <><ViewOffIcon /> Private</>}</>
}

VisibilityLegend.propTypes = {
    visibility: PropTypes.string.isRequired
}
