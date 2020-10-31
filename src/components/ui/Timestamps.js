const Timestamps = ({insertTs, updateTs}) => {
    const styles = {
        stamp: {
            fontSize: `var(--fontSizeXsmall)`,
            color: `var(--text-color)`,
            opacity: '.6',
        }
    }

    return <>
        <span style={styles.stamp}>
            <strong>Creation time:</strong>&nbsp;
            <time dateTime={insertTs}>{insertTs}</time>
            .
            {updateTs && <div> <strong>Modification time:</strong>
                &nbsp;
                <time dateTime={updateTs}>{updateTs}</time>
            </div>}
        </span>
    </>
}

export default Timestamps