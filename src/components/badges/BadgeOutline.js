export default function BadgeOutline({children, color = 'text-color', fontSize = 'fontSizeXsmall', icon}) {
    const styles = {
        badge: {
            color: `var(--${color})`,
            padding: `var(--paddingBadge)`,
            alignItems: 'center',
            display: `inline-flex`,
            borderRadius: 'var(--borderRadius)',
            border: `var(--borderWidth) solid var(--${color})`,
            fontSize: `var(--${fontSize})`
        }
    }
    return (
        <span style={styles.badge}>
            {icon}
            {children}
        </span>
    )
}

