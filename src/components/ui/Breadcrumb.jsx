import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Breadcrumb.scss';
import { IconLeft } from './Icons';

const Breadcrumb = (props) => {
    const navigate = useNavigate();

    const childrenCount = React.Children.count(props.children);
    const children = React.Children.toArray(props.children);

    const onGoBackClicked = ev => {
        ev.preventDefault();

        navigate(-1);
    }

    let links = [];
    let linkIndex = 0;
    if (navigate && navigate.length > 0) {
        links.push(<span key={linkIndex++} className="Arrow"><a href="/" title="Go back"
            onClick={onGoBackClicked}><IconLeft /></a></span>);
    }
    if (childrenCount > 0) {
        links.push(<span key={linkIndex++} className="Slash">/</span>)
    }
    children.forEach((child, index) => {
        links.push(React.cloneElement(child, { key: linkIndex++ }));
        if (index < childrenCount - 1)
            links.push(<span key={linkIndex++} className="Slash">/</span>)
    })

    return <div className="Breadcrumb">{links}</div>
}

export default Breadcrumb;
