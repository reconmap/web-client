
export default function Title({type, title}) {
    const styles = {
        container: { 
            margin : '.75rem 0'
        },
        subtitle: {
            margin: 0,
            color : 'var(--primary-color)'
        },
        title : {
            margin: 0,
            color : 'var(--text-color)'
        }
    }
    return (
        <div style={ styles.container }>
             {type && <p style={styles.subtitle}>{type}</p>}
             <h2 style={styles.title} >{title}</h2>
        </div>
    )
}
