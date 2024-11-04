const Title = ({ type, title, icon }) => {
    const styles = {
        container: {
            margin: "var(--padding) 0 var(--margin) 0",
            display: "flex",
            alignItems: "center",
        },
        icon: {
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "var(--padding)",
            width: "var(--iconSizeLarge)",
            height: "var(--iconSizeLarge)",
        },
    };
    return (
        <div style={styles.container}>
            {icon && <figure style={styles.icon}>{icon}</figure>}
            <div>
                {type && <h2 className="subtitle">{type}</h2>}
                <h1 className="title">{title}</h1>
            </div>
        </div>
    );
};

export default Title;
