import React from "react";
import {IconExternalLink} from "../icons";

import "./ExternalLink.scss"

const ExternalLink
    = (props) => {
    if (!props.children) {
        return "-"
    }

    return <span className="ExternalLinkComponent">
        <a target="_blank" rel="noopener noreferrer" {...props}>{props.children}</a>
        <IconExternalLink styling="ml-2"/>
    </span>
}

export default ExternalLink
