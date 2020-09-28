import React from "react";
import { IconExternalLink } from "../icons";
import styled from 'styled-components';

const ExternalLinkWrapper = styled.span`
    display: inline-flex;
    align-items:center;
    justify-content:flex-start;
    color: tomato;
    border-bottom: 2px solid tomato;
    &:hover {
        color: salmon;
        border-bottom: 2px solid salmon;
    }
`;


const ExternalLink
    = (props) => {
    return <ExternalLinkWrapper><a target="_blank"
              rel="noopener noreferrer" {...props}>
              {props.children}</a>
              <IconExternalLink size={4} styling="ml-2"/>
            </ExternalLinkWrapper>
}

export default ExternalLink
