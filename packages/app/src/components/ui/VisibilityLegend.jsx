import PropTypes from "prop-types";

const VisibilityLegend = ({ visibility }) => {
    return <>{visibility === "public" ? <>Public</> : <>Private</>}</>;
};

VisibilityLegend.propTypes = {
    visibility: PropTypes.string.isRequired,
};

export default VisibilityLegend;
