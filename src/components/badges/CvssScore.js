
export default function CvssScore({ score, fontSize='fontSizeXsmall' }) {
    const color = Math.floor(score) <= 3 ? 'green' : Math.floor(score) <= 6 ? 'yellow' : 'red'

    const styles = {
        badge : {
            color: `var(--${color},white)`,
            padding: `var(--paddingBadge)`,
            alignItems:'center',
            display: `flex`,
            borderRadius: 'var(--borderRadius, 3px)',
            border: `var(--borderWidth) dotted var(--smoke)`,
            fontSize : `var(--${fontSize})`,
            fontWeight : 'var(--fontBold)',
            width: '110px'
        },
        bar : {
            backgroundColor: `var(--${color},white)`,
            width: 'var(--borderWidth)',
            height: '1.3rem',
            marginRight: '4px'
        },
        text : {
            marginLeft:'auto'
        }
    }

    return (
        <div style={ styles.badge}>
            {Array.from({ length: Math.floor(score) }).map((s, index) =>
                <span key={index} style={ styles.bar }></span>
            )}
            <span style={ styles.text}>{score}</span>
        </div>
    )
}
