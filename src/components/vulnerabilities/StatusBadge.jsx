import PropTypes from 'prop-types';

const VulnerabilityStatusBadge = ({ vulnerability }) => {
    const STATUSES = {
        'open': {
            label: 'Open',
            color: 'yellow',
        },
        'confirmed': {
            label: 'Confirmed',
            color: 'orange',
        },
        'resolved': {
            label: 'Resolved',
            color: 'blue',
        },
        'closed': {
            label: 'Closed',
            color: 'green',
        },
    }
    const styles = {
        badge: {
            color: `var(--${STATUSES[vulnerability.status].color})`,
            backgroundColor: `var(--${STATUSES[vulnerability.status].color}Dark)`,
            padding: `var(--paddingBadge)`,
            alignItems: 'center',
            display: `inline-flex`,
            borderRadius: 'var(--borderRadius, 3px)',
            border: `var(--borderWidth,2px) solid transparent`,
            fontSize: `var(--fontSizeXsmall)`,
            fontWeight: 'var(--fontBold)'
        }
    }
    return (
        <span style={styles.badge}>
            {STATUSES[vulnerability.status].label} ({vulnerability.substatus})
        </span>
    )
}

VulnerabilityStatusBadge.propTypes = {
    vulnerability: PropTypes.object.isRequired
};

export default VulnerabilityStatusBadge;
