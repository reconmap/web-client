import {  IconRefresh} from '../icons'
export default function Loading() {
    const styles = {
        loading : {
            display: 'flex',
            flexDirection : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            fontWeight : 'var(--fontBold)',
            opacity: '.4',
            gap: 'var(--padding)',
            color : 'var(--text-color)'
        }
    }
    return (
        <div style={styles.loading}>
            <IconRefresh />
            Loading
        </div>
    )
}
