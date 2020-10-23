
export default function VulnerabilityStatusBadge({status}) {
    const STATUSES = {
        'open': {
            label: 'Open',
            color: 'yellow'
        },
        'closed': {
            label: 'Closed',
            color: 'green'
        },
    }
    const styles = {
        badge : {
            color: `var(--${STATUSES[status].color},white)`,
            backgroundColor: `var(--${STATUSES[status].color}Dark,white)`,
            padding: `var(--paddingBox, .3rem .8rem)`,
            alignItems:'center',
            display: `inline-flex`,
            borderRadius: 'var(--borderRadius, 3px)',
            border: `var(--borderWidth,2px) solid transparent`,
            fontSize : `var(--fontSizeXsmall)`,
            fontWeight : 'var(--fontBold)'

        }
    }
    return (
        <span style={ styles.badge }>
            {STATUSES[status].label}
        </span>
    )
}
