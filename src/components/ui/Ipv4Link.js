import React from 'react';
import { IconId } from '../icons';

const Ipv4Link = (props) => {
    return <a 
        href={`https://www.infobyip.com/ip-${props.value}.html`} 
        target="_blank"
        rel="noopener noreferrer" 
        className='font-mono text-gray-500 inline-flex items-center gap-1'
        title={`View information about IP ${props.value}`}>
        <IconId />
        {props.value}
    </a>
}

export default Ipv4Link
