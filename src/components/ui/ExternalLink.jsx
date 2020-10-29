import React from "react";
import {IconExternalLink} from "../icons";

const ExternalLink
    = (props) => {
    if (!props.children) {
        return "-"
    }
    const styles = {
        link: {
            display:'inline-flex'
        }
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} style={styles.link}>
            {props.children}
            <IconExternalLink styling={{ width: '16px', marginLeft: 'var(--margin)'}}/>
        </a>
}

export default ExternalLink
