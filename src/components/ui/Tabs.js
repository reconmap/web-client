import React, {useState} from 'react';
import './Tabs.scss'

const Tabs = ({children}) => {
    const [currentTab, setCurrentTab] = useState(0)

    const handleChangeTab = (ev, tabIndex) => {
        setCurrentTab(tabIndex)
    }

    const childrenArray = React.Children.toArray(children);

    let buttons = [];

    childrenArray.forEach((child, index) => {
        buttons.push(<button onClick={ev => handleChangeTab(ev, index)}
                             className={currentTab === index ? "active" : ""}>{child.props.name}</button>);
    })

    return <div>
        <div className='flex gap-sm mt tabs'>{buttons}</div>
        {childrenArray[currentTab].props.children}
    </div>
}

export default Tabs;
