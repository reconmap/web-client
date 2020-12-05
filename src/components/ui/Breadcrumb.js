import {IconLeft} from './Icons'
import React from 'react';
import {useHistory} from 'react-router-dom';
import './Breadcrumb.scss';

const Breadcrumb = (props) => {
    const history = useHistory();

    const childrenCount = React.Children.count(props.children);
    const children = React.Children.toArray(props.children);

    const onGoBackClicked = ev => {
        ev.preventDefault();

        history.goBack();
    }

    let links = [];
    if (history && history.length > 0) {
        links.push(<span className="Arrow"><a href="/" title="Go back"
                                              onClick={onGoBackClicked}><IconLeft/></a></span>);
    }
    if (childrenCount > 0) {
        links.push(<span className="Slash">/</span>)
    }
    children.forEach((child, index) => {
        links.push(child);
        if (index < childrenCount - 1)
            links.push(<span className="Slash">/</span>)
    })

    return <div className="Breadcrumb">{links}</div>
}

export default Breadcrumb;
