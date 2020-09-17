import React from "react";

const ExternalLink
    = (props) => {
    return <a target="_blank"
              rel="noopener noreferrer" {...props}>{props.children}</a>
}

export default ExternalLink
