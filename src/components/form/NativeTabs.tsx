import React from 'react';

interface NativeTabsProps {
    labels: string[];
    tabIndex: number;
    tabIndexSetter: (index: number) => void;
}

const NativeTabs: React.FC<NativeTabsProps> = ({ labels, tabIndex, tabIndexSetter }) => {
    return (
        <div className="tabs">
            <ul>
                {labels.map((label, index) => (
                    <li key={index} className={index === tabIndex ? "is-active" : ""}>
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            tabIndexSetter(index);
                        }}>
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NativeTabs;
