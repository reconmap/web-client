import {IconCheckCircle, IconX} from "../ui/Icons"

export default function VulnerabilityStatusBadge({status}) {
    const STATUSES = {
        'open': {
            label: 'Open',
            color: 'red',
            icon: <IconCheckCircle/>
        },
        'closed': {
            label: 'Closed',
            color: 'green',
            icon: <IconX/>
        },
    }
    const styles = {
        badge: {
            color: `var(--${STATUSES[status].color})`,
            backgroundColor: `var(--${STATUSES[status].color}Dark)`,
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
            {STATUSES[status].icon}
            {STATUSES[status].label}
        </span>
    )
}
