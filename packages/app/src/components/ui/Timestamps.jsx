const styles = {
    stamp: {
        fontSize: `var(--fontSizeXsmall)`,
        color: `var(--text-color)`,
        opacity: ".6",
    },
};

const Timestamps = ({ insertTs, updateTs }) => {
    return (
        <>
            <span style={styles.stamp}>
                <strong>Created at</strong>&nbsp;
                <time dateTime={insertTs}>{insertTs}</time>.
                {updateTs && (
                    <div>
                        <strong>Modified at</strong>
                        &nbsp;
                        <time dateTime={updateTs}>{updateTs}</time>.
                    </div>
                )}
            </span>
        </>
    );
};

export default Timestamps;
