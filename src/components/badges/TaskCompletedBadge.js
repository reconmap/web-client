import {IconCheck, IconX} from "../ui/Icons"

export default function TaskCompletedBadge({completed}) {
    const styles = {
        badge: {
            // width: 'var(--iconSizeSmall)',
            // height: 'var(--iconSizeSmall)',
            display: 'inline-flex',
            flexShrink: 0,
            padding: 'calc(var(--margin)/2)',
            borderRadius: '50%',
            color: completed === '1' ? 'var(--black)' : 'var(--text-color)',
            backgroundColor: completed === '1' ? 'var(--green)' : 'var(--black)',
            alignItems: 'center',
            justifyContent: 'center',
        }
    }
    return (
        <div style={styles.badge}>
            {completed === '1' ? <IconCheck/> : <IconX/>}
        </div>
    )
}
