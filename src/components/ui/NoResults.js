import { IconExclamationCircle} from '../icons'
export default function NoResults() {
    const styles = {
        noResults : {
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
        <div style={styles.noResults}>
            <IconExclamationCircle />
            No results
        </div>
    )
}
