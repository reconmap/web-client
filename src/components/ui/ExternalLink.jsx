import React from "react";
import { IconExternalLink } from "../icons";

const ExternalLink
    = (props) => {
    return <a target="_blank"
            className='border-b-2 border-red-500 text-red-500 hover:text-red-400 hover:border-red-400 inline-flex items-center'
              rel="noopener noreferrer" {...props}>
              {props.children}
              <IconExternalLink size={4} styling="ml-2"/>
              </a>
}

export default ExternalLink
