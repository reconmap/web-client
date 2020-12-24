import './Link.css';
import {useHistory} from 'react-router-dom';

const LinkButton = ({children, external = false, ...props}) => {
    const history = useHistory();

    const onAnchorClick = ev => {
        if (!external) {
            ev.preventDefault();

            history.push(ev.target.pathname);
        }
    }

    return (
        <a {...props} target={external ? "_blank" : ""} onClick={onAnchorClick} className="link-button">
            {children}
        </a>
    )
}

export default LinkButton;
