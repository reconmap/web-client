export default function Badge ({children, color='gray', fontSize='text-sm', icon}) {
    return (
        <span style={ styles.badge }>
            {icon}
            {children}
        </span>
    )
}

const styles = {
    badge : {
        backgroundColor: 'var(--bgColor)',
        padding: 'var(--padding)',
        border: 'var(--borderWidth) solid transparent',
    }
}