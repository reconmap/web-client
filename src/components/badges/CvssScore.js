const CvssScore = ({ score, fontSize = 'fontSizeXsmall' }) => {
    const color = Math.floor(score) <= 3 ? 'green' : Math.floor(score) <= 6 ? 'yellow' : 'red'

    const styles = {
        badge: {
            color: `var(--${color})`,
            padding: `var(--paddingBadge)`,
            alignItems: 'center',
            display: `flex`,
            borderRadius: 'var(--borderRadius, 3px)',
            border: `var(--borderWidth) solid var(--${color}Dark)`,
            fontSize: `var(--${fontSize})`,
            fontWeight: 700,
            width: '110px'
        },
        bar: {
            backgroundColor: `var(--${color})`,
            width: 'var(--borderWidth)',
            height: '1.3rem',
            marginRight: '4px'
        },
        text: {
            marginLeft: 'auto'
        }
    }

    if (score === null) {
        return <>-</>;
    }

    return <div style={styles.badge}>
        {Array.from({ length: Math.floor(score) }).map((s, index) =>
            <span key={index} style={styles.bar}></span>
        )}
        <span style={styles.text}>{score}</span>
    </div>
}

export default CvssScore;
