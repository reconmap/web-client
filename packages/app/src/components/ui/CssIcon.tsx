import React from 'react';

interface CssIconProps {
    name: string;
}

const CssIcon: React.FC<CssIconProps> = ({ name }) => {
    return (
        <i className={`fas fa-${name}`} style={{ lineHeight: "var(--bulma-line-height)" }}></i>
    );
};

export default CssIcon;
