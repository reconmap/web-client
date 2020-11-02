import React from "react";
import {IconExternalLink} from "../icons";
import "./ExternalLink.css";

const ExternalLink
    = (props) => {
    if (!props.children) {
        return "-"
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} className="ExternalLink">
        {props.children}
        <IconExternalLink styling={{width: '16px', marginLeft: 'var(--margin)'}}/>
    </a>
}

export default ExternalLink
