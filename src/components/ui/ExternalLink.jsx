import "./ExternalLink.css";

const ExternalLink = (props) => {
    if (!props.children) {
        return "-";
    }

    return (
        <a target="_blank" rel="noopener noreferrer" {...props} className="external-link">
            {props.children} 🡥
        </a>
    );
};

export default ExternalLink;
