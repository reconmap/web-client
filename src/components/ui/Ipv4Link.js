import React from 'react';

const Ipv4Link = (props) => <a href={`https://www.infobyip.com/ip-${props.value}.html`} target="_blank" rel="noopener noreferrer" title={`View information about IP ${props.value}`}>{props.value}</a>

export default Ipv4Link
