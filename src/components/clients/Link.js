
export const ClientLink = ({clientId, children}) => {
    const styles = {
        badge : {
            alignItems:'center',
            display: `inline-flex`,
            borderRadius: 'var(--borderRadius, 3px)',
            fontWeight : 'var(--fontBold)',
        }
    }


    return <a style={styles.badge} href={`/clients/${clientId}`}>{children}</a>
}
