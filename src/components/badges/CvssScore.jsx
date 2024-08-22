const CvssScore = ({ score, fontSize = "fontSizeXsmall" }) => {
    const color =
        Math.floor(score) <= 3
            ? "green"
            : Math.floor(score) <= 6
              ? "yellow"
              : "red";

    const styles = {
        badge: {
            color: `var(--${color})`,
            padding: `var(--paddingBadge)`,
            alignItems: "center",
            display: `flex`,
            borderRadius: "var(--borderRadius, 3px)",
            border: `var(--borderWidth) solid var(--${color}Dark)`,
            fontSize: `var(--${fontSize})`,
            fontWeight: 700,
            width: "110px",
        },
        text: {
            marginLeft: "auto",
        },
    };

    if (score === null) {
        return <>-</>;
    }

    return (
        <div style={styles.badge}>
            <span style={styles.text}>{score}</span>
        </div>
    );
};

export default CvssScore;
