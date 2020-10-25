import React from "react";
import {IconExternalLink} from "../icons";

const ExternalLink
    = (props) => {
    if (!props.children) {
        return "-"
    }

    return <a target="_blank" rel="noopener noreferrer" {...props}>
            {props.children}
            <IconExternalLink styling={{ width: '16px'}}/>
        </a>
}

export default ExternalLink
