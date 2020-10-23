export default function Badge ({children, color='silver', fontSize='fontSizeXsmall', icon}) {
    const styles = {
        badge : {
            color: `var(--${color},white)`,
            padding: `var(--paddingBox, .3rem .8rem)`,
            alignItems:'center',
            display: `inline-flex`,
            borderRadius: 'var(--borderRadius, 3px)',
            border: `var(--borderWidth,2px) solid transparent`,
            fontSize : `var(--${fontSize})`
        }
    }
    return (
        <span style={ styles.badge }>
            {icon}
            {children}
        </span>
    )
}

