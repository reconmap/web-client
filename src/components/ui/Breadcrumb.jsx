import React from "react";
import { useNavigate } from "react-router-dom";
import { IconLeft } from "./Icons";

const Breadcrumb = (props) => {
    const navigate = useNavigate();

    const childrenCount = React.Children.count(props.children);
    const children = React.Children.toArray(props.children);

    const onGoBackClicked = (ev) => {
        ev.preventDefault();

        navigate(-1);
    };

    return (
        <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
            <ul>
                {navigate && navigate.length > 0 && (
                    <li>
                        <a href="/" title="Go back" onClick={onGoBackClicked}>
                            <IconLeft />
                        </a>
                    </li>
                )}
                {children.map((child, index) => (
                    <li className={index === childrenCount - 1 ? "is-active" : ""}>{child}</li>
                ))}
            </ul>
        </nav>
    );
};

export default Breadcrumb;
