export default function Badge ({children, color='text-color', fontSize='fontSizeXsmall', icon}) {
    const styles = {
        badge : {
            color: `var(--${color})`,
            padding: `var(--paddingBadge)`,
            alignItems:'center',
            display: `inline-flex`,
            borderRadius: 'var(--borderRadius)',
            border: `var(--borderWidth) solid transparent`,
            fontSize : `var(--${fontSize})`,
            backgroundColor: `var(--${color}Dark)`
        }
    }
    return (
        <span style={ styles.badge }>
            {icon}
            {children}
        </span>
    )
}

