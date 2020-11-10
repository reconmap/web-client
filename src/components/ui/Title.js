const Title = ({type, title, icon}) => {
    const styles = {
        container: {
            margin: 'var(--padding) 0 var(--margin) 0',
            display: 'flex',
            alignItems: 'center',
        },
        subtitle: {
            margin: 0,
            marginBottom: '-6px',
            color: 'var(--primary-color)'
        },
        title: {
            margin: 0,
            color: 'var(--text-color)'
        },
        icon: {
            backgroundColor: 'var(--black)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 'var(--padding)',
            width: 'var(--iconSizeLarge)',
            height: 'var(--iconSizeLarge)',
            color: 'var(--primary-color)'
        }
    }
    return (

        <div style={styles.container}>
            {icon && <figure style={styles.icon}>{icon}</figure>}
            <div>
                {type && <p style={styles.subtitle}>{type}</p>}
                <h2 style={styles.title}>{title}</h2>
            </div>
        </div>
    )
}

export default Title
