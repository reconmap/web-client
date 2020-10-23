
export default function StatusBadge({ status }) {
    const STATUSES = {
        0: { color: 'gray' },
        1: { color: 'green' },
    }
    const styles = {
        badge : {
            color: `var(--${STATUSES[status].color},white)`,
            padding: `var(--paddingBox, .3rem .8rem)`,
            alignItems:'center',
            display: `inline-flex`,
            borderRadius: 'var(--borderRadius, 3px)',
            border: `var(--borderWidth,2px) solid var(--${STATUSES[status].color})`,
            fontSize : `var(--fontSizeXsmall)`
        }
    }
    return (

        <div style={ styles.badge }>
            <div className={` h-2 ${status === 0 ? 'w-2' : 'w-full'} rounded-full bg-${STATUSES[status].color}-500`}> </div>
        </div>
    )
}
